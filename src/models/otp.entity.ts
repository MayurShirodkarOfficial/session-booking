// Otp.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 6 })
  otp: string;

  @Column()
  expiry: Date;

  constructor(email: string, otp: string, expiry: Date) {
    this.email = email;
    this.otp = otp;
    this.expiry = expiry;
  }
}
