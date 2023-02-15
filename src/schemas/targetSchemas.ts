import { z } from 'zod';

const targetSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  targetTypeId: z.string({
    required_error: 'Type is required',
  }),
  value: z.number({
    required_error: 'Value is required',
  }),
});

type CreateTarget = z.infer<typeof targetSchema>;
type UpdateTarget = z.infer<typeof targetSchema>;

export { targetSchema , CreateTarget, UpdateTarget };