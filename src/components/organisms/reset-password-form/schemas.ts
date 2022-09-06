import z from 'zod';

import { commonSchemas } from '@project/schemas';

export const resetPasswordSchema = z
  .object({
    password: commonSchemas.password,
    confirmPassword: commonSchemas.password,
    token: z.string().nullish(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
