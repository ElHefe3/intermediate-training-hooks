import z from 'zod';

import { commonValidations } from '@project/validators';

export const resetPasswordValidation = z
  .object({
    password: commonValidations.password,
    confirmPassword: commonValidations.password,
    token: z.string().nullish(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
