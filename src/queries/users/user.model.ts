import map from 'lodash/map';

import { paginationModel } from '@project/models';
import { UserApi } from '@project/services';
import { User } from '@project/components';

import { UserData, UserDataApi } from './types';

export const userModel = (data?: UserApi): User => ({
  id: data?.id ?? 0,
  firstName: data?.first_name ?? '',
  lastName: data?.last_name ?? '',
  email: data?.email ?? '',
});

export const userDataModel = (data?: UserDataApi): UserData => ({
  users: map(data?.users ?? [], userModel),
  pagination: paginationModel(data?.meta),
});
