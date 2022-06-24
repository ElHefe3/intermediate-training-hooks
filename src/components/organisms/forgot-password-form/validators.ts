import * as Yup from 'yup';

import { commonValidations } from '@project/validators';

export const forgotPasswordValidation = Yup.object({
  username: commonValidations.username,
});
