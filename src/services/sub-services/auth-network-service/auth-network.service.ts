import ax from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import {
  createAttachTokenInterceptor,
  createNetworkErrorHandlerInterceptor,
} from '@project/services/utils';
import { accessTokenOperations } from '../token-service/token.service';
import {
  userAuthService,
  userAuthUtils,
  userAuthUrls,
  OAuthRefreshObject,
} from '../user-auth-service';

const authNetworkService = ax.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
});

const refreshTokenLogic = () => {
  const _tryToRefreshToken = (refreshOAuthData: OAuthRefreshObject) => {
    const tokenUrl = userAuthUrls.tokenUrl();
    return ax.post(tokenUrl, refreshOAuthData);
  };

  const _storeNewTokens = (apiResponse: {
    data: { access_token: string; refresh_token: string };
  }) => userAuthUtils.storeAccessAndRefreshTokens(apiResponse);

  return Promise.resolve()
    .then(userAuthUtils.constructOAuthTokenRefreshData)
    .then(_tryToRefreshToken)
    .then(_storeNewTokens)
    .catch(async (error) => {
      await userAuthService.logout();
      return Promise.reject(error);
    });
};

createAttachTokenInterceptor(authNetworkService, accessTokenOperations.get);
createAuthRefreshInterceptor(authNetworkService, refreshTokenLogic);
createNetworkErrorHandlerInterceptor(authNetworkService);

export default authNetworkService;
