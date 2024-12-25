/**
 * @file authValidators.ts
 * @description Validation schemas for authentication-related requests.
 */

import Joi from 'joi';

/**
 * Validate registration input.
 * @param data - Registration data
 * @returns Validation result
 */
export const validateRegisterInput = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
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
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
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
  });

  return schema.validate(data);
};
/**
 * Validate login input.
 * @param data - Login data
 * @returns Validation result
 */
export const validateLoginInput = (data: { email: string; password: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

/**
 * Validate password reset input.
 * @param data - Password reset data
 * @returns Validation result
 */
export const validatePasswordResetInput = (data: { email: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
}