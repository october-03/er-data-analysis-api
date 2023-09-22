import {
  Entity,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Game } from './Game.entity';

@Entity('game_user')
export class GameUser {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Game, (game) => game.gameUsers)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => User, (user) => user.gameUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  characterNum: number;

  @Column()
  killCount: number;

  @Column()
  deathCount: number;

  @Column()
  assistCount: number;

  @Column()
  teamKillCount: number;

  @Column()
  animalKillCount: number;

  @Column()
  seasonId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
