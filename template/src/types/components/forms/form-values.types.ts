export type LoginValuesProps = {
  username: string;
  password: string;
  remember: boolean;
};

export type ForgotPasswordValuesProps = {
  username: string;
};

export type ResetPasswordValuesProps = {
  password: string;
  confirmPassword: string;
  token: string;
};
