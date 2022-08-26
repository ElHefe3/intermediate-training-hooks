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
      password: formData?.password,
      confirm_password: formData?.confirmPassword,
      token: formData?.token,
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
