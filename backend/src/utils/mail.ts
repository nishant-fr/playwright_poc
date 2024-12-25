import nodemailer from 'nodemailer';
import logger from './logger';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Setup nodemailer transporter.
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app password
  },
});

/**
 * Sends an email with the given options.
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text content of the email
 * @param {string} html - HTML content of the email (optional)
 * @returns {Promise<void>}
 */
export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.response}`);
  } catch (error) {
    logger.error(`Error sending email: ${(error as Error).message}`);
    throw new Error('Error sending email');
  }
};
