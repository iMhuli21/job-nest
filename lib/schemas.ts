import * as z from 'zod';
import { contractTypes, experienceLevels, industries } from './constants';

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

export const profileSchema = z.object({
  contactNumber: z.string({ required_error: 'Contact number is required.' }),
  fullName: z.string({ required_error: 'Full name is required.' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email.' }),
  jobTitle: z.string({ required_error: 'Job title is required.' }),
});

export type ProfileType = z.infer<typeof profileSchema>;

export const accountSchema = z.object({
  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, 'Password should atleast be 8 characters'),
});

export type AccountType = z.infer<typeof accountSchema>;

export const createJobSchema = z.object({
  aboutCompany: z
    .string({ required_error: 'Details about the company are required.' })
    .max(5000, {
      message: 'Details about the company cannot be more than 5000 characters.',
    }),
  company: z.string({ required_error: 'Company name is required.' }),
  contract: z
    .string({ required_error: 'Contract type is required.' })
    .refine((val) => contractTypes.includes(val), {
      message: 'Invalid contract type.',
    }),
  closeDate: z.date({ required_error: 'Application close date is required.' }),
  description: z
    .string({ required_error: 'Job description is required' })
    .max(5000, {
      message: 'Job description cannot be more than 5000 characters.',
    }),
  experienceLevel: z
    .string({ required_error: 'Experience level is required' })
    .refine((val) => experienceLevels.includes(val), {
      message: 'Invalid experience level.',
    }),
  industry: z
    .string({ required_error: 'The industry of the job is required.' })
    .refine((val) => industries.includes(val), {
      message: 'Invalid industry.',
    }),
  location: z.string({ required_error: 'Location of the job is required.' }),
  rolesAndResponsibilities: z
    .string({
      required_error:
        'Information about the roles and responsibilities is required.',
    })
    .max(9000, {
      message:
        'Information about the roles and responsibilities cannot be more than 9000 characters.',
    }),
  salary: z.coerce
    .number()
    .min(0, 'Amount must be positive')
    .max(1_000_000, 'Amount too large')
    .multipleOf(0.01, 'Must have at most two decimal places'),
  title: z.string({ required_error: 'Job Title is required.' }),
});

export type CreateJobType = z.infer<typeof createJobSchema>;
