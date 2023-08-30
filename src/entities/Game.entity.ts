import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameUser } from './GameUser.entity';

@Entity('game')
export class Game {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game, { nullable: true })
  gameUsers: GameUser[];

  @Column()
  startDtm: Date;

  @Column()
  playTime: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
