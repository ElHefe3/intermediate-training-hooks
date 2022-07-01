import _ from 'lodash';

import { accessTokenOperations, refreshTokenOperations } from '@project/services';
import { OAuthRefreshObject } from '@project/services/sub-services/user-auth-service';
import appConfig from '@project/config';

const storeAccessAndRefreshTokens = (apiResponse: {
  data: { access_token: string; refresh_token: string };
}) => {
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
  scope: appConfig.scope,
});

const constructOAuthTokenRefreshData = (): OAuthRefreshObject => {
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
