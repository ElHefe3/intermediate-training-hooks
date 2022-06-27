import _ from 'lodash';

import { UserData } from '@project/hooks';
import { PaginationData } from '@project/types';
import { User } from './types';

export const userModel = (data = {}): User => ({
  id: _.get(data, 'id'),
  firstName: _.get(data, 'first_name'),
  lastName: _.get(data, 'last_name'),
  email: _.get(data, 'email'),
});

export const paginationModel = (data = {}): PaginationData => ({
  currentPage: _.get(data, 'current_page', 0),
  totalPages: _.get(data, 'total_pages', 0),
  totalCount: _.get(data, 'total_count', 0),
});

export const userDataModel = (data = {}): UserData => ({
  users: _.map(_.get(data, 'users', []), userModel),
  pagination: paginationModel(_.get(data, 'meta')),
});
