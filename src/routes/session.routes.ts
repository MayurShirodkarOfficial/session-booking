import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const sessionRouter = Router();
const sessionController = new SessionController();

// Create user route
sessionRouter.post('/',authenticateToken, sessionController.createSession);

// Get user by ID route
sessionRouter.get('/:id',authenticateToken, sessionController.getSession);

export default sessionRouter;
