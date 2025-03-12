import * as z from 'zod';
import { industries } from './constants';

export const searchSchema = z.object({
  industry: z
    .string()
    .refine((val) => industries.includes(val), {
      message: 'Invalid industry.',
    })
    .optional(),
  query: z
    .string()
    .min(1, { message: 'Query cannot be less than 1 character.' })
    .optional(),
});

export type SearchType = z.infer<typeof searchSchema>;

export const signUpSchema = z.object({
  firstName: z
    .string({ required_error: 'First Name is required.' })
    .min(1, 'First Name cannot be less than 1 character.'),
  lastName: z
    .string({ required_error: 'Last Name is required.' })
    .min(1, 'Last Name cannot be less than 1 character.'),
  contactNumber: z
    .string({ required_error: 'Contact Number is required.' })
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Invalid phone number format. Rememmber to include your country code at the start e.g. +27...'
    )
    .refine((val) => val.startsWith('+'), {
      message:
        'Invalid phone number format. Rememmber to include your country code at the start e.g. +27...',
    }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid Email.'),
  jobTitle: z.string({ required_error: 'Job Title is required.' }),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, 'Password length must atleast be 8 characters..'),
});

export type SignUpType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid Email.'),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, 'Invalid Password.'),
});

export type SignInType = z.infer<typeof signInSchema>;
