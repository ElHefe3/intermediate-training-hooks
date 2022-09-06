import z from 'zod';

import { commonSchemas } from '@project/schemas';

export const loginSchema = z.object({
  username: commonSchemas.username,
  password: commonSchemas.password,
  remember: z.boolean(),
});
