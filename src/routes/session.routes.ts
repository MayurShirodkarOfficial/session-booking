import { Router } from 'express';
import { SessionController } from '../controllers/session.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const sessionRouter = Router();
const sessionController = new SessionController();

// Create session route
/**
 * @openapi
 * /api/v1/sessions:
 *   post:
 *     summary: Create Session
 *     description: Create a new session. Requires authentication.
 *     requestBody:
 *       // ... (Add request body schema if applicable)
 *     responses:
 *       '201':
 *         description: Session created successfully.
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token.
 *       '400':
 *         description: Bad request. Invalid session data.
 */
sessionRouter.post('/',authenticateToken, sessionController.createSession);

// Get session by ID route
/**
 * @openapi
 * /api/v1/sessions/{id}:
 *   get:
 *     summary: Get Session by ID
 *     description: Retrieve a specific session by its ID. Requires authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the session to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Session retrieved successfully.
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token.
 *       '404':
 *         description: Session not found.
 */
sessionRouter.get('/:id',authenticateToken, sessionController.getSession);

export default sessionRouter;
