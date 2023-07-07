import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err: any) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authentication required' });
  }
};
