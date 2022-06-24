import { useQuery } from 'react-query';

import { userService } from '@project/services';

export const useUsersQuery = (page: number, getArchived?: boolean) =>
  useQuery(['getUsers', page, getArchived], () => userService.getUsers(page, getArchived), {
    keepPreviousData: true,
  });

export const useUserQuery = (id: number) =>
  useQuery(['getUser', id], () => userService.getUser(id), {
    keepPreviousData: true,
  });
