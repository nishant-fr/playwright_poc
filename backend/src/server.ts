/**
 * @file server.ts
 * @description Entry point for starting the Express server.
 */

import app from './app';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './utils/logger';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:55000/mydatabase';

/**
 * Connects to the MongoDB database and starts the server.
 */
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);

    logger.info('Connected to MongoDB');

    const server = createServer(app);

    server.listen(PORT, () => {
      const { port } = server.address() as AddressInfo;
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error: any) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

startServer();
