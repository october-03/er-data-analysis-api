import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { GameUser } from './GameUser.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @OneToMany(() => GameUser, (gameUser) => gameUser.user)
  gameUsers: GameUser[];

  @Column()
  lastUpdate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
