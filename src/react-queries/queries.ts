import { useQuery } from 'react-query';

import { ErrorObject } from '@project/components';
import { userService } from '@project/services';
import { useLogout } from '@project/hooks';

export const useCurrentUserQuery = () => {
  const { signOut } = useLogout();

  return useQuery('getCurrentUser', userService.getCurrentUser, {
    staleTime: Infinity,
    onError: (error: ErrorObject<string>) => {
      if (error.statusCode === 401) {
        return signOut();
      }
    },
  });
};
