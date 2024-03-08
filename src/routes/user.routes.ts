// routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const userRouter = Router();
const userController = new UserController();

// Create user route
/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create User
 *     description: Create a new user.
 *     requestBody:
 *       // ... (Add request body schema if applicable)
 *     responses:
 *       '201':
 *         description: User created successfully.
 *       '400':
 *         description: Bad request. Invalid user data.
 */
userRouter.post('/', userController.createUser);

// Get user by ID route
/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get User by ID
 *     description: Retrieve a specific user by its ID. Requires authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User retrieved successfully.
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token.
 *       '404':
 *         description: User not found.
 */
userRouter.get('/:id',authenticateToken, userController.getUser);

export default userRouter;
