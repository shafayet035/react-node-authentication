import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  code: z.string().min(1, 'Please enter code'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(
      /^(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character (!@#$%^&*)',
    ),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
