/**
 * @file auth.ts
 * @description Authentication related utilities.
 */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Generates a JWT token for a user.
 * @param userId - The ID of the user
 * @returns JWT token
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token.
 * @param token - JWT token
 * @returns Decoded token
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET); 
}