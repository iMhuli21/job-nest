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
