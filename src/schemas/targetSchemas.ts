import { z } from 'zod';

const createTargetSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, {
      message: 'Name must be at least 3 characters long',
    }),
  targetTypeId: z
    .string({
      required_error: 'Type is required',
    })
    .uuid({
      message: 'Type must be a valid UUID',
    }),
  value: z.number({
    required_error: 'Value is required',
  }),
});

const updateTargetSchema = z.object({
  name: z.string().optional(),
  targetTypeId: z.string().optional(),
  value: z.number().optional(),
});

type CreateTarget = z.infer<typeof createTargetSchema>;
type UpdateTarget = z.infer<typeof updateTargetSchema>;

export { createTargetSchema, CreateTarget, UpdateTarget };
