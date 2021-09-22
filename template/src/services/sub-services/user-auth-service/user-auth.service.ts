import _ from 'lodash';

import authUrls from './user-auth.urls';
import authUtils from './user-auth.utils';
import networkService from '../network-service/network.service';
import {
  LoginValuesProps,
  ForgotPasswordValuesProps,
  ResetPasswordValuesProps,
} from '../../../types';
import { forgotPasswordDTO, resetPasswordDTO, unlockDTO } from './user-auth.dto';

const login = (formData: LoginValuesProps) => {
  const loginUrl = authUrls.tokenUrl();
  const oAuthData = authUtils.constructOAuthSignInData(formData);

  return networkService.post(loginUrl, oAuthData).then(authUtils.storeAccessAndRefreshTokens);
};

const logout = () => {
  return authUtils.removeAccessAndRefreshTokens();
};

const forgotPassword = (formData: ForgotPasswordValuesProps) => {
  const forgotPasswordUrl = authUrls.forgotPasswordUrl();
  const dto = forgotPasswordDTO(formData);

  return networkService.post(forgotPasswordUrl, dto).catch((err) => {
    return Promise.reject(err);
  });
};

const resetPassword = (formData: ResetPasswordValuesProps) => {
  const resetPasswordUrl = authUrls.resetPasswordUrl();
  const dto = resetPasswordDTO(formData);

  return networkService.post(resetPasswordUrl, dto).catch((err) => {
    return Promise.reject(err);
  });
};

const doTokensExistInStorage = () => {
  const _trueIfBothExist = (accessToken: string | null, refreshToken: string | null) =>
    !_.isNull(accessToken) && !_.isNull(refreshToken);

  return authUtils
    .getAccessAndRefreshTokens()
    .then(([accessToken, refreshToken]) => _trueIfBothExist(accessToken, refreshToken));
};

const unlock = (token: string) => {
  const forgotPasswordUrl = authUrls.unlockAccountUrl();
  const dto = unlockDTO(token);

  return networkService.post(forgotPasswordUrl, dto).catch((err) => {
    return Promise.reject(err);
  });
};

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
  doTokensExistInStorage,
  unlock,
};
