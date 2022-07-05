import _ from 'lodash';

import { paginationModel } from '@project/models';
import { User, UserData } from './types';

export const userModel = (data = {}): User => ({
  id: _.get(data, 'id'),
  firstName: _.get(data, 'first_name'),
  lastName: _.get(data, 'last_name'),
  email: _.get(data, 'email'),
});

export const userDataModel = (data = {}): UserData => ({
  users: _.map(_.get(data, 'users', []), userModel),
  pagination: paginationModel(_.get(data, 'meta')),
});
