import z from 'zod';

import { commonSchemas } from '@project/schemas';

export const forgotPasswordSchema = z.object({
  username: commonSchemas.username,
});
