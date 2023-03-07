import { z, ZodIssue } from 'zod';

export const joinZodIssues = (errors: ZodIssue[]) => errors.map((error) => error.message).join(', ');

export const cuidSchema = z.string().cuid({
    message: 'Target CUID must be a valid CUID',
  });