import z from 'zod';

import { commonValidations } from '@project/validators';

export const forgotPasswordValidation = z.object({
  username: commonValidations.username,
});
