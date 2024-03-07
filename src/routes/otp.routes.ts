import { Router } from 'express';
import { OtpController } from '../controllers/otp.controller';
const otpRouter = Router();
const otpController = new OtpController;
//verify otp
otpRouter.post('/', otpController.verifyEmailWithOTP);

export default otpRouter;