// SpeakerController.ts
import { Request, Response } from 'express';
import { DataSourceConfig } from '../config/typeORMConfig';
import { Speaker } from '../models/speaker.entity';
import { Repository } from 'typeorm';
import { sendEmailVerificationOTP } from '../service/otp.email.service';
import { generateOTP, storeOtp } from '../service/otp.service';
import bcrypt from 'bcrypt';
import { SpeakerResponse } from '../dto/speaker.dto';
export class SpeakerController {
  async createSpeaker(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName, expertise, pricePerSession } = req.body;
      const speakerRepository: Repository<Speaker> = DataSourceConfig.getRepository(Speaker);
      const existingSpeaker = await speakerRepository.findOne({ where: { email } });
      if (existingSpeaker) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newSpeaker = speakerRepository.create({ email, password: passwordHash, firstName, lastName, expertise, pricePerSession });
      await speakerRepository.save(newSpeaker);
      const otp = generateOTP()
      const currentTime = new Date();
      const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60 * 1000)
      storeOtp(email, otp, tenMinutesLater);
      sendEmailVerificationOTP(email, otp);
      return res.status(201).json(new SpeakerResponse(newSpeaker.firstName, newSpeaker.lastName, newSpeaker.email, newSpeaker.expertise, newSpeaker.pricePerSession, "speaker"));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getSpeaker(req: Request, res: Response) {
    try {
      const speakerId = parseInt(req.params.id);
      const speakerRepository: Repository<Speaker> = DataSourceConfig.getRepository(Speaker);
      const speaker = await speakerRepository.findOne({ where: { id: speakerId } });
      if (!speaker) {
        return res.status(404).json({ error: 'Speaker not found' });
      }
      return res.status(200).json(new SpeakerResponse(speaker.firstName, speaker.lastName, speaker.email, speaker.expertise, speaker.pricePerSession, "speaker"));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
