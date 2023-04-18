import { useQuery } from '@tanstack/react-query';
import { ErrorObject } from '@codehesion-za/headless';

import { useLogout } from '@project/hooks';
import { userService } from '@project/services';
import { userDataModel } from '@project/queries';

export const useUsersQuery = (page: number, per: number, getArchived: boolean) =>
  useQuery(
    ['getUsers', page, per, getArchived],
    () => userService.getUsers(page, per, getArchived),
    {
      select: userDataModel,
    },
  );

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
