// Speaker Entity
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from './session.entity';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  expertise: string;

  @Column()
  pricePerSession: number;

  @OneToMany(() => Session, session => session.speaker)
  sessions: Session[] | undefined;

  constructor(firstName: string, lastName: string, email: string, password: string, expertise: string, pricePerSession: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.expertise = expertise;
    this.pricePerSession = pricePerSession;
  }
}
