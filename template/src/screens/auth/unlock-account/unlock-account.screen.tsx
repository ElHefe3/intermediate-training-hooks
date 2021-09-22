import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import _ from 'lodash';

import { AuthLayout, Button, FormContainer } from '../../../components';
import { userAuthService } from '../../../services';
import { Logo } from '../../../assets';

const UnlockAccountScreen: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [message, setMessage] = useState('');

  const onBackToLogin = () => {
    toast.remove();
    history.push('/login');
  };

  const onSuccess = () => {
    history.push('/login?unlock=successful');
  };

  const unlockAccount = () => {
    const token = new URLSearchParams(location.search).get('token');

    if (!_.isEmpty(token)) {
      userAuthService
        .unlock(token)
        .then(() => onSuccess())
        .catch(() => {
          toast.remove();
          toast.error('Something went wrong, please contact support', { duration: Infinity });
          setMessage('Failed, please use the link from the email');
        });
    } else {
      toast.remove();
      toast.error('No unlock token found', { duration: Infinity });
      setMessage('Failed, please use the link from the email, your token is missing');
    }
  };

  useEffect(() => {
    setMessage('Your account is being unlocked...');
    unlockAccount();
  }, []);

  return (
    <AuthLayout>
      <FormContainer>
        <img src={Logo} alt="gomobile logo" className="auth-image" />
        <p className="auth-sub-heading">{message}</p>
        <Button onClick={onBackToLogin} type="text" className="w-40 self-center mt-5">
          Back to log in
        </Button>
      </FormContainer>
    </AuthLayout>
  );
};

export default UnlockAccountScreen;
