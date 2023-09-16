import { Request, Response } from 'express';
import { User } from '../model/user';
import { hashPassword, validateSpecialCharacter, verifyPassword } from '../utils';
import { JWT_SECRET } from '../constants';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { sendPasswordResetEmail } from '../emails/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if (!validateSpecialCharacter(password))
      return res.status(400).json({ message: 'Password must contain at least one special character e.g !@#$%^&*()' });

    const isUserExist = await User.findOne({ email }).exec();
    if (isUserExist) return res.status(409).send('Email is already is in use');

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await user.save();
    console.log(result);

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong, internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '3m' });
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong, internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong, internal server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  const code = randomstring.generate(5);

  try {
    const user = await User.findOneAndUpdate({ email }, { passwordResetCode: code }).exec();

    if (!user) return res.status(404).json({ message: 'User not found' });

    // send email
    await sendPasswordResetEmail(email, code);

    return res.status(200).json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong, internal server error' });
  }
};
