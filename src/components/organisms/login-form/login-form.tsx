import { useEffect, useState } from 'react';
import { FormikProps } from 'formik/dist/types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { TextField, Form, Button, ErrorObject, Checkbox } from '@project/components';
import { localStorageService, userAuthService } from '@project/services';
import config from '@project/config';
import { LoginValuesProps, RouteState } from './types';
import { loginSchema } from './schemas';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const [rememberEmail, setRememberEmail] = useState('');

  const reset = new URLSearchParams(search).get('reset');
  const unlock = new URLSearchParams(search).get('unlock');
  const rememberMe = localStorageService.getItem(config.rememberMeKey) ?? '';

  const initialValues = {
    username: rememberEmail,
    password: '',
    remember: !_.isEmpty(rememberEmail),
  };

  const onForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  const { mutateAsync } = useMutation(
    (formData: LoginValuesProps) => userAuthService.login(formData),
    {
      onSuccess: (_data, variables) => {
        localStorageService.setItem(
          config.rememberMeKey,
          variables.remember ? variables.username : '',
        );
        navigate((state as RouteState)?.from || '/');
      },
      onError: (error: ErrorObject<typeof initialValues>) => {
        const message =
          error.message === 'invalid_grant' ? 'Invalid email or password' : error.message;
        toast.error(message, { duration: 5000 });
      },
    },
  );

  const submitForm = (formData: LoginValuesProps) => {
    return mutateAsync(formData);
  };

  useEffect(() => {
    if (reset === 'successful') {
      toast.success('Password successfully reset', { duration: 5000 });
    } else if (unlock === 'successful') {
      toast.success('Account successfully unlocked', { duration: 5000 });
    }
  }, [reset, unlock]);

  useEffect(() => {
    setRememberEmail(rememberMe.toString());
  }, [rememberMe]);

  const FormComponents = ({
    values,
    handleChange,
    isSubmitting,
    handleSubmit,
  }: FormikProps<LoginValuesProps>) => (
    <div className="auth-form-body">
      <TextField name="username" label="Email" type="email" />
      <TextField name="password" label="Password" type="password" />
      <div className="flex justify-between">
        <label htmlFor="remember" className="space-x-2 flex items-center">
          <Checkbox name="remember" checked={values.remember} onChange={handleChange('remember')} />
          <span>Remember me</span>
        </label>
        <Button variant="text" onClick={onForgotPasswordClick}>
          Forgot Password
        </Button>
      </div>
      <Button
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit}
        className="submit-button"
      >
        Login
      </Button>
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      submitForm={submitForm}
      onFailure={() => null}
      validationSchema={loginSchema}
      render={FormComponents}
    />
  );
};
