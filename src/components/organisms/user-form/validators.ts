import * as Yup from 'yup';

import { commonValidations } from '@project/validators';

export const userValidation = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: commonValidations.username,
});
