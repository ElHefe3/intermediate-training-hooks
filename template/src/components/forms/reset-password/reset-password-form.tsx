import React from 'react';
import { TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { Button } from '../../atoms';
import { resetPasswordValidation } from '../../../validators';
import { BaseFormProps, ErrorObject, ResetPasswordValuesProps } from '../../../types';

export const ResetPasswordForm: React.FC<BaseFormProps<ResetPasswordValuesProps>> = ({
  initialValues,
  submitForm,
  onSuccess,
}) => {
  const _handleFormSubmitError = (
    error: ErrorObject,
    actions: FormikHelpers<ResetPasswordValuesProps>,
  ) => {
    const apiErrors = _.get(error, 'errors');
    if (!_.isEmpty(apiErrors)) {
      actions.setErrors(apiErrors);
    } else {
      toast.error(error.message);
    }
  };

  const _handleSubmission = (
    formData: ResetPasswordValuesProps,
    actions: FormikHelpers<ResetPasswordValuesProps>,
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
      validationSchema={resetPasswordValidation}
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
            id="password"
            label="Password"
            type="password"
            value={values.password}
            error={touched.password && !!errors.password}
            helperText={touched.password ? errors.password : ''}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            error={touched.confirmPassword && !!errors.confirmPassword}
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
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
