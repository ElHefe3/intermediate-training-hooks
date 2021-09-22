import appConfig from '../../../config';

const { hostUrl, apiUrl } = appConfig;
export default {
  tokenUrl: (): string => `${hostUrl}/oauth/token`,
  forgotPasswordUrl: (): string => `${apiUrl()}/users/forgot_password`,
  resetPasswordUrl: (): string => `${apiUrl()}/users/reset_password`,
  unlockAccountUrl: (): string => `${apiUrl()}/users/unlock_account`,
};
