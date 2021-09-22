import _ from 'lodash';

import { UserModelProps } from '../../../types';

export const userModel = (data = {}): UserModelProps => ({
  email: _.get(data, 'email'),
  mobile: _.get(data, 'mobile'),
});
