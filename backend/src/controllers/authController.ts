/**
 * @file authController.ts
 * @description Controller for handling user authentication.
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import logger from '../utils/logger';
import { generateToken } from '../utils/jwt';
import { validateRegisterInput, validateLoginInput, validatePasswordResetInput } from '../validators/authValidators';
import { encrypt, generateRandomPassword } from '../utils/cryptoUtils';
import { sendEmail } from '../utils/mail';

/**
 * Register a new user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { error } = validateRegisterInput(req.body);
    if (error) {
      logger.error(`Registration validation error: ${error.details[0].message}`);
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      birthDate,
      socialSecurityId,
      bloodType,
      sex,
      usualPhysician,
      usualCareSite,
    } = req.body;
        const existingUser = await User.findOne({ email: encrypt(email) });
    if (existingUser) {
      logger.warn(`Registration failed: User with email ${email} already exists.`);
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      password,
      socialSecurityId,
      bloodType,
      sex,
      usualPhysician,
      usualCareSite,
    });


    await user.save();
    logger.info(`User registered successfully: ${email}`);

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    logger.error(`Error in register: ${(error as any).message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Log in an existing user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = validateLoginInput(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: encrypt(email) });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error: any) {
    logger.error(`Error in login: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/**
 * Resets the password for a user and sends the new password to their email.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const resetPassword = async (req: Request, res: Response)=> {

  const { error } = validatePasswordResetInput(req.body);
  if (error) {
    logger.error(`Reset password validation error: ${error.details[0].message}`);
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;
  try {
    const user = await User.findOne({ email: encrypt(email) });
    if (!user) {
      logger.warn(`Reset password failed: User not found for email ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }
    const newPassword = generateRandomPassword();
    user.password = newPassword;
    await user.save();
logger.info(`Password reset for user: ${email}`);
    try {
      // Send the new password to the user's email
      await sendEmail(email, 'Your New Password', `Your new password is: ${newPassword}`);
      logger.info(`Password reset email sent to: ${email}`);
      res.status(200).json({ message: 'New password sent to your email' });
    } catch (emailError) {
      logger.error(`Error sending email to ${email}: ${(emailError as Error).message}`);
      res.status(500).json({ message: 'Error sending email', error: (emailError as Error).message });
    }
  } catch (err: any) {
    logger.error(`Reset password error: ${err.message}`);
    res.status(500).json({ message: 'An error occurred during password reset', error: err.message });
  }
};
