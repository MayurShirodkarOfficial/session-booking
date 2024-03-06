import { Request, Response } from 'express';
import { DataSourceConfig } from '../config/typeORMConfig';
import { Session } from '../models/session.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { Speaker } from '../models/speaker.entity';

export class SessionController {
  async createSession(req: Request, res: Response) {
    try {
      const { userId, speakerId, startTime, endTime, timeSlot } = req.body;
      const sessionRepository: Repository<Session> = DataSourceConfig.getRepository(Session);
      const userRepository: Repository<User> = DataSourceConfig.getRepository(User);
      const speakerRepository: Repository<Speaker> = DataSourceConfig.getRepository(Speaker);
      const user: User | null = await userRepository.findOne({ where: { id: userId } });
      const speaker: Speaker | null = await speakerRepository.findOne({ where: { id: speakerId, } });

      if (!user) {
        return res.status(404).json({ error: 'User Not Found' });
      }
      if (!speaker) {
        return res.status(404).json({ error: 'Speaker Not Found' });
      }
      const existingSessionOnTimeSlot = await sessionRepository.findOne({ where: { speaker: { id: speakerId }, timeSlot } });
      if (existingSessionOnTimeSlot) {
        return res.status(409).json({ message: 'Session already Booked' });
      }
      else {
        const session: Session = new Session(user, speaker, startTime, endTime, timeSlot);
        const newSession = sessionRepository.create(session);
        await sessionRepository.save(newSession);
        return res.status(201).json(newSession);
      }

    } catch (error) {
      console.error(error);
      return res.status(409).json({ message: 'Session slot not possible' });
    }
  }

  async getSession(req: Request, res: Response) {
    try {
      const sessionId = parseInt(req.params.id);
      const sessionRepository: Repository<Session> = DataSourceConfig.getRepository(Session);
      const session = await sessionRepository.findOne({ where: { id: sessionId } });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      return res.status(200).json(session);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
