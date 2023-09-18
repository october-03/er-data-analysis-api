import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('season_user')
export class SeasonUser {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.seasonData)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  seasonId: number;

  @Column()
  matchingTeamMode: number;

  @Column({ nullable: true })
  mmr: number;

  @Column()
  rank: number;

  @Column()
  rankSize: number;

  @Column()
  totalGames: number;

  @Column()
  totalWins: number;

  @Column('double precision')
  averageRank: number;

  @Column('double precision')
  averageKills: number;

  @Column('double precision')
  averageAssists: number;

  @Column('double precision')
  averageHunts: number;

  @Column('double precision')
  winRate: number;

  @Column('double precision')
  top2Rate: number;

  @Column('double precision')
  top3Rate: number;
}
