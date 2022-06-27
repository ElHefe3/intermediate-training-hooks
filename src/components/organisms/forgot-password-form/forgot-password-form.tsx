import React from 'react';
import { FormikProps } from 'formik/dist/types';
import { toast } from 'react-hot-toast';

import { FormBodyContainer, TextField, Button, Form, ErrorObject } from '@project/components';
import { userAuthService } from '@project/services';
import { forgotPasswordValidation } from './validators';
import { ForgotPasswordValuesProps } from './types';

export const ForgotPasswordForm: React.FunctionComponent = () => {
  const initialValues: ForgotPasswordValuesProps = {
    username: '',
  };

  const submitForm = (formData: ForgotPasswordValuesProps) =>
    userAuthService.forgotPassword(formData);

  const onSuccess = () => {
    toast.success('Successfully Sent', { duration: 5000 });
  };

  const onFailure = (error: ErrorObject<typeof initialValues>) => {
    toast.error(error.message, { duration: 5000 });
  };

  const FormComponents = ({
    isSubmitting,
    handleSubmit,
  }: FormikProps<ForgotPasswordValuesProps>) => {
    return (
      <FormBodyContainer>
        <TextField name="username" label="Email" type="email" />
        <Button
          type="submit"
          isLoading={isSubmitting}
          onClick={handleSubmit}
          className="submit-button"
        >
          Reset Password
        </Button>
      </FormBodyContainer>
    );
  };

  return (
    <Form
      initialValues={initialValues}
      submitForm={submitForm}
      onSuccess={onSuccess}
      onFailure={onFailure}
      validationSchema={forgotPasswordValidation}
      render={FormComponents}
    />
  );
};
