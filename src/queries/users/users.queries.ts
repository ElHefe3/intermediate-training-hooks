import { useQuery } from '@tanstack/react-query';

import { useLogout } from '@project/hooks';
import { UserApi, userService } from '@project/services';
import { UserData, UserDataApi, userDataModel, userModel } from '@project/queries';
import { ErrorObject } from '@project/services/utils';
import { User } from '@project/components';

export const useUsersQuery = (page: number, per: number, getArchived: boolean) =>
  useQuery<UserDataApi, ErrorObject<UserData>, UserData>(
    ['getUsers', page, per, getArchived],
    () => userService.getUsers(page, per, getArchived),
    {
      select: userDataModel,
    },
  );

export const useCurrentUserQuery = () => {
  const { signOut } = useLogout();

  return useQuery<UserApi, ErrorObject<User>, User>(
    ['getCurrentUser'],
    userService.getCurrentUser,
    {
      select: userModel,
      staleTime: Infinity,
      onError: async (error) => {
        if (error.statusCode === 401) {
          await signOut();
        }
      },
    },
  );
};
