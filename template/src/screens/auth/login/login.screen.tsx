import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { AuthLayout, FormContainer, LoginForm } from '../../../components';
import { localStorageService, userAuthService } from '../../../services';
import { useAppDispatch, getUserAction } from '../../../reducers';
import { LoginValuesProps } from '../../../types';
import { Logo } from '../../../assets';
import config from '../../../config';

const LoginScreen: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { state, search } = useLocation();
  const [rememberEmail, setRememberEmail] = useState('');

  const reset = new URLSearchParams(search).get('reset');
  const unlock = new URLSearchParams(search).get('unlock');
  const rememberMe = localStorageService.getItem(config.rememberMeKey) ?? '';

  const loginFormInitialValues: LoginValuesProps = {
    username: rememberEmail,
    password: '',
    remember: !_.isEmpty(rememberEmail),
  };

  const onLoginSubmit = (formData: LoginValuesProps) => {
    localStorageService.setItem(
      config.rememberMeKey,
      _.get(formData, 'remember', false) ? _.get(formData, 'username') : '',
    );
    return userAuthService.login(formData);
  };

  const onSuccess = () => {
    dispatch(getUserAction()).then(() => {
      history.push(_.get(state, 'from') || '/');
    });
  };

  useEffect(() => {
    if (reset === 'successful') {
      toast.success('Password successfully reset', { duration: 5000 });
    } else if (unlock === 'successful') {
      toast.success('Account successfully unlocked', { duration: 5000 });
    }
    setRememberEmail(rememberMe.toString());
  }, [reset, rememberMe]);

  return (
    <AuthLayout>
      <FormContainer>
        <img src={Logo} alt="gomobile logo" className="auth-image" />
        <p className="auth-sub-heading">Welcome back! Please log in to your account.</p>
        <LoginForm
          initialValues={loginFormInitialValues}
          submitForm={onLoginSubmit}
          onSuccess={onSuccess}
        />
      </FormContainer>
    </AuthLayout>
  );
};

export default LoginScreen;
