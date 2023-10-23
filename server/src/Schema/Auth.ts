import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Please enter a name').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Minimum of 6 characters')
    .regex(/[!@#$%^&*()]/, 'Must contain at least one special character'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Minimum of 6 characters')
    .regex(/[!@#$%^&*()]/, 'Must contain at least one special character'),
});
