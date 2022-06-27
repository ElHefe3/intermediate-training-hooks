import { AuthLayout, FormScreenContainer, LoginForm } from '@project/components';
import { Logo } from '@project/assets';

export const LoginPage = () => (
  <AuthLayout>
    <FormScreenContainer>
      <img src={Logo} alt="logo" className="auth-image" />
      <p className="auth-sub-heading">Welcome back! Please log in to your account.</p>
      <LoginForm />
    </FormScreenContainer>
  </AuthLayout>
);
