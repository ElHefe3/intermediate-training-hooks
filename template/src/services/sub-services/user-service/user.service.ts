import _ from 'lodash';

import userUrls from './user.urls';
import authNetworkService from '../auth-network-service/auth-network.service';

const getCurrentUser = () => {
  const url = userUrls.getUserUrl();

  return authNetworkService
    .get(url)
    .then((apiResponse) => _.get(apiResponse, 'data'))
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default {
  getCurrentUser,
};
