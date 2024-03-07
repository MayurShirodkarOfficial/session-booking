import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { DataSourceConfig } from './config/typeORMConfig';
import userRouter from './routes/user.routes';
import speakerRouter from './routes/speaker.routes';
import sessionRouter from './routes/session.routes';
import authRouter from './routes/auth.routes';
import { requestLogger } from './middlewares/logger.middleware';
import otpRouter from './routes/otp.routes';
const app = express();
//db connection
DataSourceConfig.initialize()
    .then(async () => {
        console.log("Connected To DB!");
    })
    .catch((error) => console.log(error));


//swagger config
app.use(express.json());

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Speaker Session Booking API',
        description: 'API documentation for Speaker Session Booking platform',
        version: '1.0.0',
    },
    basePath: 'localhost:3000/api/v1/',
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ]
}


const swaggerOptions = {
    swaggerDefinition,
    explorer: true,
    // Path to the API specs
    apis: ['**/*.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Logging middleware
app.use(requestLogger);
app.use(express.json());
//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/speakers', speakerRouter);
app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/verify/email',otpRouter);
export default app;
