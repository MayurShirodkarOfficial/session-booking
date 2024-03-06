import { Router } from 'express';
import { SpeakerController } from '../controllers/speaker.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const speakerRouter = Router();
const speakerController = new SpeakerController();

// Create user route
speakerRouter.post('/', authenticateToken,speakerController.createSpeaker);

// Get user by ID route
speakerRouter.get('/:id',authenticateToken, speakerController.getSpeaker);

export default speakerRouter;
