import { useNavigate } from 'react-router-dom';

import { userAuthService } from '@project/services';

export const useLogout = () => {
  const navigate = useNavigate();

  const signOut = () =>
    userAuthService.logout().then(() => {
      navigate('/');
    });

  return { signOut };
};
