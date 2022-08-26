import z from 'zod';

import { commonValidations } from '@project/validators';

export const loginValidation = z.object({
  username: commonValidations.username,
  password: commonValidations.password,
  remember: z.boolean(),
});
