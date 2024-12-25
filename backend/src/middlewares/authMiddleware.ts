/**
 * @file authMiddleware.ts
 * @description Middleware for authenticating JWT tokens.
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import logger from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate the JWT token.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded: any = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    logger.error(`Error in authenticateToken: ${(error as Error).message}`);
    res.status(400).json({ message: 'Invalid token' });
  }
};
