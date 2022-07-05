import { PaginationData } from '@project/types';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserData = {
  users: User[];
  pagination: PaginationData;
};
