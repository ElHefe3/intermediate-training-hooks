import z from 'zod';

import { commonSchemas } from '@project/schemas';

export const userSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: commonSchemas.username,
});
