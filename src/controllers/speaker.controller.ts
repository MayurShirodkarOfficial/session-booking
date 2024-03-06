// SpeakerController.ts
import { Request, Response } from 'express';
import { DataSourceConfig } from '../config/typeORMConfig';
import { Speaker } from '../models/speaker.entity';
import { Repository } from 'typeorm';

export class SpeakerController {
  async createSpeaker(req: Request, res: Response) {
    try {
      const { email,password,firstName, lastName, expertise, pricePerSession } = req.body;
      const speakerRepository:Repository<Speaker> = DataSourceConfig.getRepository(Speaker);
      const newSpeaker = speakerRepository.create({email,password, firstName, lastName, expertise, pricePerSession });
      await speakerRepository.save(newSpeaker);
      return res.status(201).json(newSpeaker);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getSpeaker(req: Request, res: Response) {
    try {
      const speakerId = parseInt(req.params.id);
      const speakerRepository:Repository<Speaker> = DataSourceConfig.getRepository(Speaker);
      const speaker = await speakerRepository.findOne({where:{id:speakerId}});
      if (!speaker) {
        return res.status(404).json({ error: 'Speaker not found' });
      }
      return res.status(200).json(speaker);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
