import * as Yup from 'yup';

import { commonValidations } from '@project/validators';

export const loginValidation = Yup.object({
  username: commonValidations.username,
  password: commonValidations.password(false),
});
