import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRouter = express.Router();
const authController = new AuthController();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user and generate access token.
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
 *                 description: User email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password.
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *       '400':
 *         description: Invalid email or password.
 *       '403':
 *         description: Forbidden. Invalid credentials.
 */
authRouter.post('/login', authController.userLogin);

/**
 * @openapi
 * /api/v1/auth/speakerlogin:
 *   post:
 *     summary: Speaker Login
 *     description: Authenticate speaker and generate access token.
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
 *                 description: Speaker email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Speaker password.
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *       '400':
 *         description: Invalid email or password.
 *       '403':
 *         description: Forbidden. Invalid credentials.
 */
authRouter.post('/speakerlogin', authController.speakerLogin);

export default authRouter;
