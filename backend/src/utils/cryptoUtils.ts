import crypto from 'crypto';

/**
 * Generates a 32-byte encryption key using the provided secret.
 * @param {string} secret - The secret used to generate the key.
 * @returns {Buffer} - The generated key.
 */
const generateKey = (secret: string): Buffer => {
  return crypto.createHash('sha256').update(secret).digest();
};

// Use an environment variable for the secret key, fallback to a default key
const secretKey = process.env.ENCRYPTION_KEY || 'your_secret_key';

// Fixed 16-byte IV for encryption.
const iv = Buffer.alloc(16, 0);

/**
 * Encrypts the given text using AES-256-CBC.
 * @param {string} text - The text to encrypt.
 * @returns {string} - The encrypted text in hex format.
 */
export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', generateKey(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

/**
 * Decrypts the given text using AES-256-CBC.
 * @param {string} text - The encrypted text in hex format.
 * @returns {string} - The decrypted text.
 */
export const decrypt = (text: string): string => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', generateKey(secretKey), iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

/**
 * Generates a random password.
 * @returns {string} - The generated password.
 */
export const generateRandomPassword = (): string => {
  return crypto.randomBytes(8).toString('hex');
} 