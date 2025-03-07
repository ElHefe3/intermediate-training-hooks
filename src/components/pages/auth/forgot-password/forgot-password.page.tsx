import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormScreenContainer, ForgotPasswordForm, Button } from '@project/components';
import { Logo } from '@project/assets';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/login');
  };

  return (
    <FormScreenContainer>
      <img src={Logo} alt="logo" className="auth-image" />
      <p className="auth-sub-heading">
        If your account exists, we will send you an email to reset your password
      </p>
      <ForgotPasswordForm />
      <Button onClick={onBack} variant="text" style="w-1 self-center mt-5">
        Back
      </Button>
    </FormScreenContainer>
  );
};
