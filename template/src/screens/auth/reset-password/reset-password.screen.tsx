import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { AuthLayout, FormContainer, ResetPasswordForm } from '../../../components';
import { ResetPasswordValuesProps } from '../../../types';
import { userAuthService } from '../../../services';
import { Logo } from '../../../assets';

const ResetPasswordScreen: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const initialValues = {
    password: '',
    confirmPassword: '',
    token: new URLSearchParams(location.search).get('token'),
  };

  const onSubmit = (formData: ResetPasswordValuesProps) => userAuthService.resetPassword(formData);

  const onSuccess = () => {
    history.replace('/login?reset=successful');
  };

  return (
    <AuthLayout>
      <FormContainer>
        <img src={Logo} alt="gomobile logo" className="auth-image" />
        <p className="auth-sub-heading">Please enter your new password</p>
        <ResetPasswordForm
          initialValues={initialValues}
          submitForm={onSubmit}
          onSuccess={onSuccess}
        />
      </FormContainer>
    </AuthLayout>
  );
};

export default ResetPasswordScreen;
