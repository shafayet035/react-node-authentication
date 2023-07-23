import { Document, Schema, model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  passwordResetCode?: string;
  profilePicture?: string;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export const User = model<User>('User', userSchema);
