import _ from 'lodash';

import { ForgotPasswordValuesProps, ResetPasswordValuesProps } from '@project/components';

export const forgotPasswordDTO = (formData: ForgotPasswordValuesProps) => {
  return {
    user: formData,
  };
};

export const resetPasswordDTO = (formData: ResetPasswordValuesProps) => {
  return {
    user: {
      password: _.get(formData, 'password'),
      confirm_password: _.get(formData, 'confirmPassword'),
      token: _.get(formData, 'token'),
    },
  };
};

export const unlockDTO = (token: string) => {
  return {
    user: {
      token,
    },
  };
};
