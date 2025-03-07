import { Form, ErrorObject } from '@codehesion-za/headless';
import { useMutation } from '@tanstack/react-query';
import { FormikProps } from 'formik/dist/types';
import { toast } from 'react-hot-toast';
import React from 'react';

import { FormBodyContainer, Button, TextField } from '@project/components';
import { userAuthService } from '@project/services';

import { ForgotPasswordValuesProps } from './types';
import { forgotPasswordSchema } from './schemas';

export const ForgotPasswordForm: React.FC = () => {
  const initialValues = {
    username: '',
  };

  const { mutateAsync } = useMutation(
    (formData: ForgotPasswordValuesProps) => userAuthService.forgotPassword(formData),
    {
      onSuccess: () => {
        toast.success('Successfully Sent', { duration: 5000 });
      },
      onError: (error: ErrorObject<typeof initialValues>) => {
        toast.error(error.message, { duration: 5000 });
      },
    },
  );

  const submitForm = (formData: ForgotPasswordValuesProps) => mutateAsync(formData);

  const FormComponents = ({
    isSubmitting,
    handleSubmit,
  }: FormikProps<ForgotPasswordValuesProps>) => {
    return (
      <FormBodyContainer>
        <TextField name="username" label="Email" type="email" />
        <Button type="submit" isLoading={isSubmitting} onClick={handleSubmit} style="submit-button">
          Reset Password
        </Button>
      </FormBodyContainer>
    );
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmitForm={submitForm}
      validationSchema={forgotPasswordSchema}
      render={FormComponents}
    />
  );
};
