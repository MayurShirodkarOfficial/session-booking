import { Request, Response } from 'express';
import { DataSourceConfig } from '../config/typeORMConfig';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import bcrypt from 'bcrypt';
import { sendEmailVerificationOTP } from '../service/otp.email.service';
import { generateOTP, storeOtp } from '../service/otp.service';
import { UserResponse } from '../dto/user.dto';
export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const userRepository: Repository<User> = DataSourceConfig.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({ firstName, lastName, email, password: passwordHash });
      await userRepository.save(newUser);
      const otp = generateOTP()
      const currentTime = new Date();
      const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60 * 1000)
      storeOtp(email,otp,tenMinutesLater);
      sendEmailVerificationOTP(email,otp);
      return res.status(201).json(new UserResponse(newUser.firstName,newUser.lastName,newUser.email,"user"));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const userRepository: Repository<User> = DataSourceConfig.getRepository(User);
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(201).json(new UserResponse(user.firstName,user.lastName,user.email,"user"));
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
