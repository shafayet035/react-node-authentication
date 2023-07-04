import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { hashPassword, validateSpecialCharacter } from '../utils';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if (!validateSpecialCharacter(password)) return res.status(400).json({ message: 'Password must contain at least one special character e.g !@#$%^&*()' });

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

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong, internal server error' });
  }
};
