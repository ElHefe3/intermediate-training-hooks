import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import isEmpty from 'lodash/isEmpty';

import { FormScreenContainer, Button } from '@project/components';
import { userAuthService } from '@project/services';
import { Logo } from '@project/assets';

export const UnlockAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');

  const onBackToLogin = () => {
    toast.remove();
    navigate('/login');
  };

  const onSuccess = () => {
    navigate('/login?unlock=successful');
  };

  const unlockAccount = () => {
    const token = new URLSearchParams(location.search).get('token')!;

    if (!isEmpty(token)) {
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
    <FormScreenContainer>
      <img src={Logo} alt="logo" className="auth-image" />
      <p className="auth-sub-heading">{message}</p>
      <Button onClick={onBackToLogin} variant="text" style="w-40 self-center mt-5">
        Back to log in
      </Button>
    </FormScreenContainer>
  );
};
