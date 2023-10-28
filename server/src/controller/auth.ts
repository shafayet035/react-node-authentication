import { Request, Response } from 'express';
import { User } from '../model/user';
import { hashPassword, verifyPassword } from '../utils';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../constants';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import { sendPasswordResetEmail } from '../emails/auth';
import { registerSchema, resetPasswordSchema } from '../Schema/Auth';
import { z } from 'zod';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    try {
      registerSchema.parse({ name, email, password });
    } catch (error) {
      const err = error as z.ZodError;

      return res.status(405).send({ message: err.errors[0].message });
    }

    const isUserExist = await User.findOne({ email }).exec();
    if (isUserExist)
      return res.status(409).send({ message: 'Email is already is in use' });

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
    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password)
      return res.status(400).json({ message: 'Password is required' });

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({
      message: 'User logged in successfully',
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;

  const code = randomstring.generate(5);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: code },
    ).exec();

    if (!user) return res.status(404).json({ message: 'User not found' });

    // send email
    await sendPasswordResetEmail(email, code);

    return res
      .status(200)
      .json({ message: 'Password reset code sent to your email' });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, password, code } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.passwordResetCode !== code)
      return res.status(400).json({ message: 'Invalid code' });

    try {
      resetPasswordSchema.parse({ email, password });
    } catch (error) {
      const err = error as z.ZodError;
      return res.status(405).json({ message: err.errors[0] });
    }

    const newHashedPassword = await hashPassword(password);

    user.password = newHashedPassword as string;
    user.passwordResetCode = '';

    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: 'Something went wrong, internal server error' });
  }
};
