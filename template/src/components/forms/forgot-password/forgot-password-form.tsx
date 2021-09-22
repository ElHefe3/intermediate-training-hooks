import React from 'react';
import { TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { Button } from '../../atoms';
import { forgotPasswordValidation } from '../../../validators';
import { BaseFormProps, ErrorObject, ForgotPasswordValuesProps } from '../../../types';

export const ForgotPasswordForm: React.FC<BaseFormProps<ForgotPasswordValuesProps>> = ({
  initialValues,
  submitForm,
  onSuccess,
}) => {
  const _handleFormSubmitError = (
    error: ErrorObject,
    actions: FormikHelpers<ForgotPasswordValuesProps>,
  ) => {
    const apiErrors = _.get(error, 'errors');
    if (!_.isEmpty(apiErrors)) {
      actions.setErrors(apiErrors);
    } else {
      toast.error(error.message);
    }
  };

  const _handleSubmission = (
    formData: ForgotPasswordValuesProps,
    actions: FormikHelpers<ForgotPasswordValuesProps>,
  ) => {
    submitForm(formData)
      .then(() => {
        onSuccess();
      })
      .catch((error: ErrorObject) => {
        _handleFormSubmitError(error, actions);
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordValidation}
      validateOnBlur
      validateOnChange={false}
      onSubmit={_handleSubmission}
    >
      {({
        handleSubmit,
        isSubmitting,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleReset,
      }) => (
        <form onReset={handleReset} onSubmit={handleSubmit} className="auth-form-body">
          <TextField
            id="username"
            label="Email"
            type="email"
            value={values.username}
            error={touched.username && !!errors.username}
            helperText={touched.username ? errors.username : ''}
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit}
            className="auth-form-submit-button"
          >
            Reset Password
          </Button>
        </form>
      )}
    </Formik>
  );
};
