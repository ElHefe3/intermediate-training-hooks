import * as Yup from 'yup';

import { commonValidations } from '@project/validators';

export const resetPasswordValidation = Yup.object({
  password: commonValidations.password(false),
  confirmPassword: commonValidations.confirmPassword,
});
