import { Request, Response } from 'express';
import { User } from '../models/user.entity';
import { Speaker } from '../models/speaker.entity';
import { Otp } from '../models/otp.entity';
import { DataSourceConfig } from '../config/typeORMConfig';
export class OtpController {
    
    async verifyEmailWithOTP(req: Request, res: Response) {
        const { email, otp } = req.body;

        try {
            // Find the OTP in the database
            const otpRepository = DataSourceConfig.getRepository(Otp);
            const storedOtp = await otpRepository.findOne({ where: { email } });

            if (!storedOtp) {
                return res.status(400).json({ error: 'OTP not found for the email' });
            }

            if (storedOtp.otp !== otp) {
                return res.status(400).json({ error: 'Incorrect OTP' });
            }

            if (storedOtp.expiry < new Date()) {
                return res.status(400).json({ error: 'OTP has expired' });
            }

            // Update user/speaker as verified
            const userRepository = DataSourceConfig.getRepository(User);
            const speakerRepository = DataSourceConfig.getRepository(Speaker);

            const user = await userRepository.findOne({ where: { email } });
            const speaker = await speakerRepository.findOne({ where: { email } });

            if (user) {
                user.isVerified = true;
                await userRepository.save(user);
            } else if (speaker) {
                speaker.isVerified = true;
                await speakerRepository.save(speaker);
            } else {
                return res.status(400).json({ error: 'User or Speaker not found' });
            }

            // Delete OTP record from the database
            await otpRepository.delete(storedOtp);
            // Email verification successful
            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error('Error verifying email with OTP:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
