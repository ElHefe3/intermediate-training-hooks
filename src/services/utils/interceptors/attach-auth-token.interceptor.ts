import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const createAttachTokenInterceptor = (
  axiosInstance: AxiosInstance,
  getAccessToken: () => string | object | null,
) => {
  const _attachAccessToken = (_config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    _config.headers.setAuthorization(`Bearer ${accessToken}`);

    return _config;
  };

  return axiosInstance.interceptors.request.use(_attachAccessToken);
};
