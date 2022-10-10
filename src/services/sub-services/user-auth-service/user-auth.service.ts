import _ from 'lodash';

import {
  LoginValuesProps,
  ForgotPasswordValuesProps,
  ResetPasswordValuesProps,
} from '@project/components';
import { networkService } from '@project/services';
import { rejectPromise } from '@project/services/utils';
import { forgotPasswordDTO, resetPasswordDTO, unlockDTO } from './user-auth.dto';
import userAuthUtils from './user-auth.utils';
import userAuthUrls from './user-auth.urls';

const login = (formData: LoginValuesProps) => {
  const loginUrl = userAuthUrls.tokenUrl();
  const dto = userAuthUtils.constructOAuthSignInData(formData);

  return networkService.post(loginUrl, dto).then(userAuthUtils.storeAccessAndRefreshTokens);
};

const logout = () => {
  return userAuthUtils.removeAccessAndRefreshTokens();
};

const forgotPassword = (formData: ForgotPasswordValuesProps) => {
  const forgotPasswordUrl = userAuthUrls.forgotPasswordUrl();
  const dto = forgotPasswordDTO(formData);

  return networkService.post(forgotPasswordUrl, dto).catch(rejectPromise);
};

const resetPassword = (formData: ResetPasswordValuesProps) => {
  const resetPasswordUrl = userAuthUrls.resetPasswordUrl();
  const dto = resetPasswordDTO(formData);

  return networkService.post(resetPasswordUrl, dto).catch(rejectPromise);
};

const doTokensExistInStorage = () => {
  const _trueIfBothExist = (accessToken: string | null, refreshToken: string | null) =>
    !_.isNull(accessToken) && !_.isNull(refreshToken);

  return userAuthUtils
    .getAccessAndRefreshTokens()
    .then(([accessToken, refreshToken]) => _trueIfBothExist(accessToken, refreshToken));
};

const unlock = (token: string) => {
  const forgotPasswordUrl = userAuthUrls.unlockAccountUrl();
  const dto = unlockDTO(token);

  return networkService.post(forgotPasswordUrl, dto).catch(rejectPromise);
};

export default {
  login,
  logout,
  forgotPassword,
  resetPassword,
  doTokensExistInStorage,
  unlock,
};
