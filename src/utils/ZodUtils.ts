import { ZodIssue } from 'zod';

export const joinZodIssues = (errors: ZodIssue[]) => errors.map((error) => error.message).join(', ');
