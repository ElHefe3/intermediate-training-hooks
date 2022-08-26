import { useQuery } from '@tanstack/react-query';

import { ErrorObject } from '@project/components';
import { useLogout } from '@project/hooks';
import { userService } from '@project/services';

export const useUsersQuery = (page: number, getArchived: boolean) =>
  useQuery(['getUsers', page, getArchived], () => userService.getUsers(page, getArchived));

export const useUserQuery = (id: number) =>
  useQuery(['getUser', id], () => userService.getUser(id));

export const useCurrentUserQuery = () => {
  const { signOut } = useLogout();

  return useQuery(['getCurrentUser'], userService.getCurrentUser, {
    staleTime: Infinity,
    onError: (error: ErrorObject<string>) => {
      if (error.statusCode === 401) {
        return signOut();
      }
    },
  });
};
