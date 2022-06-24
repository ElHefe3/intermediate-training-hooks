import { localStorageService, sessionStorageService } from '@project/services';
import config from '@project/config';

const checkIfLocalStorageService = () => {
  return localStorageService.getItem(config.rememberMeKey);
};

function getOperations(key: string) {
  return {
    get: () =>
      checkIfLocalStorageService()
        ? localStorageService.getItem(key)
        : sessionStorageService.getItem(key),
    store: (token: string) =>
      checkIfLocalStorageService()
        ? localStorageService.setItem(key, token)
        : sessionStorageService.setItem(key, token),
    remove: () =>
      checkIfLocalStorageService()
        ? localStorageService.removeItem(key)
        : sessionStorageService.removeItem(key),
  };
}

const accessTokenOperations = getOperations(config.accessTokenKey);
const refreshTokenOperations = getOperations(config.refreshTokenKey);

export { accessTokenOperations, refreshTokenOperations };
