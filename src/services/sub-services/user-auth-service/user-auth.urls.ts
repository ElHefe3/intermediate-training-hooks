import appConfig from '@project/config';

const { hostUrl, apiUrl } = appConfig;

const usersUrl = `${apiUrl}/users`;

export default {
  tokenUrl: (): string => `${hostUrl}/oauth/token`,
  forgotPasswordUrl: (): string => `${usersUrl}/forgot_password`,
  resetPasswordUrl: (): string => `${usersUrl}/reset_password`,
  unlockAccountUrl: (): string => `${usersUrl}/unlock_account`,
};
