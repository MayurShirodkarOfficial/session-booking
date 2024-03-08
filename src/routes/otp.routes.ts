import { Router } from 'express';
import { OtpController } from '../controllers/otp.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const otpRouter = Router();
const otpController = new OtpController;
//verify otp
/**
 * @openapi
 * /api/v1/otp:
 *   post:
 *     summary: Verify Email with OTP
 *     description: Verify a user's email address by providing a valid OTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               otp:
 *                 type: string
 *                 description: One-Time Password received by the user.
 *     responses:
 *       '200':
 *         description: Email verified successfully.
 *       '400':
 *         description: Invalid email or OTP.
 *       '401':
 *         description: Unauthorized. Verification failed.
 */
otpRouter.post('/',authenticateToken,otpController.verifyEmailWithOTP);

export default otpRouter;