import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthLayout, FormContainer, ForgotPasswordForm, Button } from '../../../components';
import { ForgotPasswordValuesProps } from '../../../types';
import { userAuthService } from '../../../services';
import { Logo } from '../../../assets';

const ForgotPasswordScreen: React.FC = () => {
  const history = useHistory();

  const initialValues = {
    username: '',
  };

  const onSubmit = (formData: ForgotPasswordValuesProps) =>
    userAuthService.forgotPassword(formData);

  const onSuccess = () => {
    toast.success('Successfully Sent', { duration: 5000 });
  };

  const onBack = () => {
    history.push('/login');
  };

  return (
    <AuthLayout>
      <FormContainer>
        <img src={Logo} alt="gomobile logo" className="auth-image" />
        <p className="auth-sub-heading">
          If your account exists, we will send you an email to reset your password
        </p>
        <ForgotPasswordForm
          initialValues={initialValues}
          submitForm={onSubmit}
          onSuccess={onSuccess}
        />
        <Button onClick={onBack} type="text" className="w-1 self-center mt-5">
          Back
        </Button>
      </FormContainer>
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
