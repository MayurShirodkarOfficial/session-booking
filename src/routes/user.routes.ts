// routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const userRouter = Router();
const userController = new UserController();

// Create user route
userRouter.post('/',authenticateToken, userController.createUser);

// Get user by ID route
userRouter.get('/:id',authenticateToken, userController.getUser);

export default userRouter;
