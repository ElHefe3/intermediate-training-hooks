import React from 'react';
import { FormikProps } from 'formik/dist/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { Button, ErrorObject, Form } from '@project/components/atoms';
import { TextField } from '@project/components/molecules';
import { userAuthService } from '@project/services';
import { ResetPasswordValuesProps } from './types';
import { resetPasswordValidation } from './validators';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues: ResetPasswordValuesProps = {
    password: '',
    confirmPassword: '',
    token: new URLSearchParams(location.search).get('token'),
  };

  const onSubmit = (formData: ResetPasswordValuesProps) => userAuthService.resetPassword(formData);

  const onSuccess = () => {
    navigate({
      pathname: '/login',
      search: 'reset=successful',
    });
  };

  const onFailure = (error: ErrorObject<typeof initialValues>) => {
    toast.error(error.message, { duration: 5000 });
  };

  const FormComponents = ({
    isSubmitting,
    handleSubmit,
  }: FormikProps<ResetPasswordValuesProps>) => (
    <div className="auth-form-body">
      <TextField name="password" label="Password" type="password" />
      <TextField name="confirmPassword" label="Confirm Password" type="password" />
      <Button
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit}
        className="submit-button"
      >
        Reset Password
      </Button>
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      submitForm={onSubmit}
      onSuccess={onSuccess}
      onFailure={onFailure}
      validationSchema={resetPasswordValidation}
      render={FormComponents}
    />
  );
};
