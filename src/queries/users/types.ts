import { User } from '@project/components';
import { UserApi } from '@project/services';
import { Pagination, PaginationApi } from '@project/types';

export type UserDataApi = {
  users: UserApi[];
  meta: PaginationApi;
};

export type UserData = {
  users: User[];
  pagination: Pagination;
};
