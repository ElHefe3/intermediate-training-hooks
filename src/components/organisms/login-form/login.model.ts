import _ from 'lodash';

import { LoginValuesProps } from './types';

export const loginModel = (data = {}): LoginValuesProps => ({
  username: _.get(data, 'email', _.get(data, 'username')),
  password: _.get(data, 'password'),
  remember: _.get(data, 'remember'),
});
