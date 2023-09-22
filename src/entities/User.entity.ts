import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { GameUser } from './GameUser.entity';
import { SeasonUser } from './SeasonUser.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => GameUser, (gameUser) => gameUser.user, { nullable: true })
  gameUsers: GameUser[];

  @OneToMany(() => SeasonUser, (seasonUser) => seasonUser.user, {
    nullable: true,
  })
  seasonData: SeasonUser[];

  @Column()
  lastUpdate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
