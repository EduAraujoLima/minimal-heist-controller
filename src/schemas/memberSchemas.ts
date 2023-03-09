import { z } from 'zod';

const createMemberSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Name must be at most 50 characters long',
      }),
    rank: z
      .number({
        required_error: 'Rank is required',
      })
      .min(1, {
        message: 'Rank must be at least 1',
      })
      .max(8000, {
        message: 'Rank must be at most 8000',
      }),
    avatar: z.string(),
  })
  .strict();

const updateMemberSchema = z
  .object({
    name: z.string().optional(),
    rank: z.number().optional(),
    avatar: z.string().optional(),
  })
  .strict();

type CreateMember = z.infer<typeof createMemberSchema>;
type UpdateMember = z.infer<typeof updateMemberSchema>;

export { createMemberSchema, updateMemberSchema, type CreateMember, type UpdateMember };
