import z from 'zod';

import { commonValidations } from '@project/validators';

export const userSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: commonValidations.username,
});
