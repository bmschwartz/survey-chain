import { object, string, union } from 'zod';

export const signInSchema = object({
  email: string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const signUpSchema = object({
  email: string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ required_error: 'Confirm password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  displayName: union([
    string()
      .min(1, 'Display Name must be between 1 and 32 characters')
      .max(32, 'Display Name must be between 1 and 32 characters'),
    string().length(0),
  ])
    .optional()
    .transform((e) => (e === '' ? undefined : e)),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
