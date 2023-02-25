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
    .cuid({
      message: 'Type must be a valid CUID',
    }),
  normalModeValue: z.number({
    required_error: 'Value on normal mode is required',
  }),
  hardModeValue: z.number({
    required_error: 'Value on hard mode is required',
  }),
}).strict();

const updateTargetSchema = z.object({
  name: z.string().optional(),
  targetTypeId: z.string().optional(),
  value: z.number().optional(),
});

const getTargetByUuidSchema = z.string().cuid({
  message: 'Target UUID must be a valid CUID',
});

type CreateTarget = z.infer<typeof createTargetSchema>;
type UpdateTarget = z.infer<typeof updateTargetSchema>;

export { createTargetSchema, CreateTarget, UpdateTarget, getTargetByUuidSchema };
