import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters long'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(
      /^(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character (!@#$%^&*)',
    ),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
