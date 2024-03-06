import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DataSourceConfig } from '../config/typeORMConfig';
import { User } from '../models/user.entity';
import { Speaker } from '../models/speaker.entity';

export class AuthController {
    async userLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const userRepository = DataSourceConfig.getRepository(User);
            const user = await userRepository.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            return res.status(200).json({ access_token: token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async speakerLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const speakerRepository = DataSourceConfig.getRepository(Speaker);
            const speaker = await speakerRepository.findOne({ where: { email } });
            if (!speaker) {
                return res.status(404).json({ error: 'Speaker not found' });
            }
            const passwordMatch = await bcrypt.compare(password, speaker.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            // Generate JWT token
            const token = jwt.sign({ userId: speaker.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            return res.status(200).json({ access_token: token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
