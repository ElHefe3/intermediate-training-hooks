import { User } from '@project/react-queries';
import { PaginationData } from '@project/types';

export type UserData = {
  users: User[];
  pagination: PaginationData;
};
