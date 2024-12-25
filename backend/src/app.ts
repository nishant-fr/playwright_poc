/**
 * @file app.ts
 * @description Main Express application setup.
 */

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import auth from './routes/auth';
import user from './routes/user';
import dotenv from 'dotenv';
import winston from 'winston';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize routes
app.use('/api/auth', auth);
app.use('/api/user', user);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  winston.error(err.message);
  res.status(500).send({ error: 'An error occurred, please try again later.' });
});

export default app;
