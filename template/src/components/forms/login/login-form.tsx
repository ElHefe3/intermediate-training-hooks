import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { Button } from '../../atoms';
import { loginValidation } from '../../../validators';
import { LoginValuesProps, ErrorObject, BaseFormProps } from '../../../types';

export const LoginForm: React.FC<BaseFormProps<LoginValuesProps>> = ({
  initialValues,
  submitForm,
  onSuccess,
}) => {
  const history = useHistory();

  const _handleFormSubmitError = (error: ErrorObject, actions: FormikHelpers<LoginValuesProps>) => {
    const apiErrors = _.get(error, 'errors');
    if (!_.isEmpty(apiErrors)) {
      actions.setErrors(apiErrors);
    } else if (error.statusCode === 400) {
      actions.setFieldError(
        'password',
        error.message === 'invalid_grant' ? 'Invalid email or password' : error.message,
      );
    } else {
      toast.error(error.message);
    }
  };

  const _handleSubmission = (
    formData: LoginValuesProps,
    actions: FormikHelpers<LoginValuesProps>,
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

  const onForgotPasswordClick = () => {
    history.push('/forgot-password');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      validateOnBlur
      validateOnChange={false}
      onSubmit={_handleSubmission}
      enableReinitialize
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
          <div className="flex justify-between">
            <FormControlLabel
              checked={values.remember}
              onChange={handleChange('remember')}
              control={<Checkbox name="remember" id="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="text" onClick={onForgotPasswordClick}>
              Forgot Password
            </Button>
          </div>
          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit}
            className="auth-form-submit-button"
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  );
};
