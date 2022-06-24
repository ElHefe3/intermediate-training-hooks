import { AuthLayout, FormScreenContainer, ResetPasswordForm } from '@project/components';
import { Logo } from '@project/assets';

export const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <FormScreenContainer>
        <img src={Logo} alt="logo" className="auth-image" />
        <p className="auth-sub-heading">Please enter your new password</p>
        <ResetPasswordForm />
      </FormScreenContainer>
    </AuthLayout>
  );
};
