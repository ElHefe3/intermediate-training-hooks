import z from 'zod';

import { commonSchemas } from '@project/schemas';

export const userSchema = (needPassword = false) =>
  z
    .object({
      id: z.number().optional(),
      firstName: z.string(),
      lastName: z.string(),
      email: commonSchemas.username,
      password: needPassword ? commonSchemas.password : commonSchemas.password.optional(),
      confirmPassword: needPassword ? commonSchemas.password : commonSchemas.password.optional(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });
