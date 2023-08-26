import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
