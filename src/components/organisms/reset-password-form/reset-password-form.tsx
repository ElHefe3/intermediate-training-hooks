import { useLocation, useNavigate } from 'react-router-dom';
import { Form, ErrorObject } from '@codehesion-za/headless';
import { useMutation } from '@tanstack/react-query';
import { FormikProps } from 'formik/dist/types';
import { toast } from 'react-hot-toast';
import React from 'react';

import { Button, TextField } from '@project/components/atoms';
import { userAuthService } from '@project/services';

import { ResetPasswordValuesProps } from './types';
import { resetPasswordSchema } from './schemas';

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    password: '',
    confirmPassword: '',
    token: new URLSearchParams(location.search).get('token'),
  };

  const { mutateAsync } = useMutation(
    (formData: ResetPasswordValuesProps) => userAuthService.resetPassword(formData),
    {
      onSuccess: () => {
        navigate({
          pathname: '/login',
          search: 'reset=successful',
        });
      },
      onError: (error: ErrorObject<typeof initialValues>) => {
        toast.error(error.message, { duration: 5000 });
      },
    },
  );

  const onSubmit = (formData: ResetPasswordValuesProps) => mutateAsync(formData);

  const FormComponents = ({
    isSubmitting,
    handleSubmit,
  }: FormikProps<ResetPasswordValuesProps>) => (
    <div className="auth-form-body">
      <TextField name="password" label="Password" type="password" />
      <TextField name="confirmPassword" label="Confirm Password" type="password" />
      <Button type="submit" isLoading={isSubmitting} onClick={handleSubmit} style="submit-button">
        Reset Password
      </Button>
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      onSubmitForm={onSubmit}
      validationSchema={resetPasswordSchema}
      render={FormComponents}
    />
  );
};
