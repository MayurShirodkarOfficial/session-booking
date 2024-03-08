// Session Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Speaker } from './speaker.entity';

export enum TimeSlot {
  SLOT1 = '9:00 AM - 10:00 AM',
  SLOT2 = '10:00 AM - 11:00 AM',
  SLOT3 = '11:00 AM - 12:00 PM',
  SLOT4 = '12:00 PM - 1:00 PM',
  SLOT5 = '1:00 PM - 2:00 PM',
  SLOT6 = '2:00 PM - 3:00 PM',
  SLOT7 = '3:00 PM - 4:00 PM',
}

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Speaker)
  speaker: Speaker;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP + INTERVAL 1 HOUR' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: TimeSlot,
  })
  timeSlot: TimeSlot;

  constructor(user: User, speaker: Speaker, startTime: Date, endTime: Date, timeSlot: TimeSlot) {
    this.user = user;
    this.speaker = speaker;
    this.startTime = startTime;
    this.endTime = endTime;
    this.timeSlot = timeSlot;
  }
}
