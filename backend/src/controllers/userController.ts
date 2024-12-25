import { Request, Response } from 'express';
import User from '../models/user';
import logger from '../utils/logger';
import { validateUserProfileUpdate } from '../validators/userValidators';
import { decrypt } from '../utils/cryptoUtils';

/**
 * Get user profile by ID.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.firstName) user.firstName = decrypt(user.firstName);
    if (user.lastName) user.lastName = decrypt(user.lastName);
    if (user.email) user.email = decrypt(user.email);
    if (user.phone) user.phone = decrypt(user.phone);
    if (user.socialSecurityId) user.socialSecurityId = decrypt(user.socialSecurityId);
    if (user.bloodType) user.bloodType = decrypt(user.bloodType) as any;
    if (user.sex) user.sex = decrypt(user.sex) as any;
    if (user.usualPhysician) {
      if (user.usualPhysician.firstName) user.usualPhysician.firstName = decrypt(user.usualPhysician.firstName);
      if (user.usualPhysician.lastName) user.usualPhysician.lastName = decrypt(user.usualPhysician.lastName);
      if (user.usualPhysician.title) user.usualPhysician.title = decrypt(user.usualPhysician.title) as any;
    }
    if (user.usualCareSite) {
      if (user.usualCareSite.name) user.usualCareSite.name = decrypt(user.usualCareSite.name);
      if (user.usualCareSite.address) user.usualCareSite.address = decrypt(user.usualCareSite.address);
    }
    if (user.birthDate) user.birthDate = decrypt(user.birthDate);

    res.status(200).json(user);
  } catch (error: any) {
    logger.error(`Error in getUserProfile: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Update user profile.
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('req.body', req.body);
    const { error } = validateUserProfileUpdate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const {
      email,
      firstName,
      lastName,
      phone,
      socialSecurityId,
      bloodType,
      birthDate,
      sex,
      usualPhysician,
      usualCareSite
    } = req.body;

    const user = await User.findById((req as any).user.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (socialSecurityId) user.socialSecurityId = socialSecurityId;
    if (bloodType) user.bloodType = bloodType;
    if (sex) user.sex = sex;
    if (usualPhysician) user.usualPhysician = usualPhysician;
    if (usualCareSite) user.usualCareSite = usualCareSite;
    if (birthDate) user.birthDate = birthDate;

    await user.save();

    user.decryptFields(); // Decrypt fields before sending response

    res.status(200).json(user);
  } catch (error: any) {
    logger.error(`Error in updateUserProfile: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
