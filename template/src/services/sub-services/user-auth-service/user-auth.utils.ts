import _ from 'lodash';

import { accessTokenOperations, refreshTokenOperations } from '../token-service/token.service';
import appConfig from '../../../config';

const storeAccessAndRefreshTokens = (apiResponse: Object) => {
  const accessToken = _.get(apiResponse, 'data.access_token', null);
  const refreshToken = _.get(apiResponse, 'data.refresh_token', null);
  return Promise.all([
    accessTokenOperations.store(accessToken),
    refreshTokenOperations.store(refreshToken),
  ]);
};

const removeAccessAndRefreshTokens = () =>
  Promise.all([accessTokenOperations.remove(), refreshTokenOperations.remove()]);

const getAccessAndRefreshTokens = () =>
  Promise.all([
    accessTokenOperations.get() as string | null,
    refreshTokenOperations.get() as string | null,
  ]);

const constructOAuthSignInData = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => ({
  username,
  password,
  grant_type: 'password',
  client_id: appConfig.clientId,
  client_secret: appConfig.clientSecret,
});

const constructOAuthTokenRefreshData = () => {
  const refreshToken = refreshTokenOperations.get() as string | null;
  return {
    grant_type: 'refresh_token',
    client_id: appConfig.clientId,
    client_secret: appConfig.clientSecret,
    refresh_token: refreshToken,
  };
};

export default {
  storeAccessAndRefreshTokens,
  constructOAuthSignInData,
  constructOAuthTokenRefreshData,
  removeAccessAndRefreshTokens,
  getAccessAndRefreshTokens,
};
