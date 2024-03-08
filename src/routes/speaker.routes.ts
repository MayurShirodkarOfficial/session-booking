import { Router } from 'express';
import { SpeakerController } from '../controllers/speaker.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const speakerRouter = Router();
const speakerController = new SpeakerController();

// Create speaker route
/**
 * @openapi
 * /api/v1/speakers:
 *   post:
 *     summary: Create Speaker
 *     description: Create a new speaker.
 *     requestBody:
 *       // ... (Add request body schema if applicable)
 *     responses:
 *       '201':
 *         description: Speaker created successfully.
 *       '400':
 *         description: Bad request. Invalid speaker data.
 */
speakerRouter.post('/',speakerController.createSpeaker);

// Get speaker by ID route
/**
 * @openapi
 * /api/v1/speakers/{id}:
 *   get:
 *     summary: Get Speaker by ID
 *     description: Retrieve a specific speaker by its ID. Requires authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the speaker to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Speaker retrieved successfully.
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token.
 *       '404':
 *         description: Speaker not found.
 */
speakerRouter.get('/:id',authenticateToken, speakerController.getSpeaker);

export default speakerRouter;
