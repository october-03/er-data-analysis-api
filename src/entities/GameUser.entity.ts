import {
  Entity,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Game } from './Game.entity';

@Entity('game_user')
export class GameUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Game, (game) => game.gameUsers)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => User, (user) => user.gameUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  characterNum: number;

  @Column()
  KillCount: number;

  @Column()
  DeathCount: number;

  @Column()
  AssistCount: number;

  @Column()
  TeamKillCount: number;

  @Column()
  AnimalKillCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
