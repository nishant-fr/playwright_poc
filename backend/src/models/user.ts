import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../utils/cryptoUtils';

/**
 * Interface representing a User document in MongoDB.
 * @interface IUser
 * @extends {Document}
 */
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  socialSecurityId?: string;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  sex?: 'Male' | 'Female' | 'Other';
  birthDate?: string;
  usualPhysician?: {
    firstName: string;
    lastName: string;
    title: 'Dr.' | 'Pr.' | 'Prof.';
  };
  usualCareSite?: {
    name: string;
    address: string;
  };
  password: string;
  decryptFields: () => void;
}

/**
 * Mongoose schema for the User model.
 */
const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  socialSecurityId: { type: String, required: false },
  bloodType: { type: String, required: false },
  sex: { type: String, required: false },
  birthDate: { type: String, required: false },
  usualPhysician: {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    title: { type: String, required: false },
  },
  usualCareSite: {
    name: { type: String, required: false },
    address: { type: String, required: false },
  },
  password: { type: String, required: true },
});

/**
 * Pre-save middleware to hash the password and encrypt other fields before saving.
 */
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified('firstName')) this.firstName = encrypt(this.firstName);
  if (this.isModified('lastName')) this.lastName = encrypt(this.lastName);
  if (this.isModified('email')) this.email = encrypt(this.email);
  if (this.isModified('phone')&& this.phone) this.phone = encrypt(this.phone);
  if (this.isModified('socialSecurityId') && this.socialSecurityId) this.socialSecurityId = encrypt(this.socialSecurityId);
  if (this.isModified('bloodType') && this.bloodType) this.bloodType = encrypt(this.bloodType) as any;
  if (this.isModified('sex') && this.sex) this.sex = encrypt(this.sex) as any;
  if (this.isModified('birthDate') && this.birthDate) this.birthDate = encrypt(this.birthDate);
  if (this.isModified('usualPhysician') && this.usualPhysician) {
    if (this.usualPhysician.firstName) this.usualPhysician.firstName = encrypt(this.usualPhysician.firstName);
    if (this.usualPhysician.lastName) this.usualPhysician.lastName = encrypt(this.usualPhysician.lastName);
    if (this.usualPhysician.title) this.usualPhysician.title = encrypt(this.usualPhysician.title) as any;
  }
  if (this.isModified('usualCareSite') && this.usualCareSite) {
    if (this.usualCareSite.name) this.usualCareSite.name = encrypt(this.usualCareSite.name);
    if (this.usualCareSite.address) this.usualCareSite.address = encrypt(this.usualCareSite.address);
  }
  next();
});

/**
 * Method to decrypt user fields after retrieving them from the database.
 */
userSchema.methods.decryptFields = function (): void {
  if (this.firstName) this.firstName = decrypt(this.firstName);
  if (this.lastName) this.lastName = decrypt(this.lastName);
  if (this.email) this.email = decrypt(this.email);
  if (this.phone) this.phone = decrypt(this.phone);
  if (this.socialSecurityId) this.socialSecurityId = decrypt(this.socialSecurityId);
  if (this.bloodType) this.bloodType = decrypt(this.bloodType) as any;
  if (this.sex) this.sex = decrypt(this.sex);
  if (this.birthDate) this.birthDate = decrypt(this.birthDate);
 if (this.usualPhysician) this.decryptUsualPhysician();
 if (this.usualCareSite) this.decryptUsualCareSite();
};

userSchema.methods.decryptUsualPhysician = function (): void {
  if (this.usualPhysician) {
    if (this.usualPhysician.firstName) this.usualPhysician.firstName = decrypt(this.usualPhysician.firstName);
    if (this.usualPhysician.lastName) this.usualPhysician.lastName = decrypt(this.usualPhysician.lastName);
    if (this.usualPhysician.title) this.usualPhysician.title = decrypt(this.usualPhysician.title) as any;
  }
};

userSchema.methods.decryptUsualCareSite = function (): void {
  if (this.usualCareSite) {
    if (this.usualCareSite.name) this.usualCareSite.name = decrypt(this.usualCareSite.name);
    if (this.usualCareSite.address) this.usualCareSite.address = decrypt(this.usualCareSite.address);
  }
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
