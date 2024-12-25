
/**
 * @file userValidators.ts
 * @description Validation schemas for user-related requests.
 */

import Joi from 'joi';


/**
 * Validate user profile update input.
 * @param data - User profile update data
 * @returns Validation result
 */
export const validateUserProfileUpdate = (data: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  socialSecurityId?: string;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  sex?: 'Male' | 'Female' | 'Other';
  usualPhysician?: {
    firstName: string;
    lastName: string;
    title: 'Dr.' | 'Pr.' | 'Prof.';
  };
  usualCareSite?: {
    name: string;
    address: string;
  };
}) => {
  const schema = Joi.object({
    _id: Joi.string().optional().strip(),   // Strip the _id field
    email: Joi.string().email().optional(), // Optional during updates
    firstName: Joi.string().min(2).max(30).optional(),
    lastName: Joi.string().min(2).max(30).optional(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).optional(),
    birthDate: Joi.string().optional(),
    socialSecurityId: Joi.string().optional(),
    bloodType: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional(),
    sex: Joi.string().valid('Male', 'Female', 'Other').optional(),
    usualPhysician: Joi.object({
      firstName: Joi.string().min(2).max(30).optional(),
      lastName: Joi.string().min(2).max(30).optional(),
      title: Joi.string().valid('Dr.', 'Pr.', 'Prof.').optional(),
    }).optional(),
    usualCareSite: Joi.object({
      name: Joi.string().min(2).max(100).optional(),
      address: Joi.string().min(5).max(100).optional(),
    }).optional(),
    __v: Joi.number().optional().strip()    // Strip the __v field
  });

  return schema.validate(data);
};
