import { FormScreenContainer, ResetPasswordForm } from '@project/components';
import { Logo } from '@project/assets';

export const ResetPasswordPage = () => {
  return (
    <FormScreenContainer>
      <img src={Logo} alt="logo" className="auth-image" />
      <p className="auth-sub-heading">Please enter your new password</p>
      <ResetPasswordForm />
    </FormScreenContainer>
  );
};
