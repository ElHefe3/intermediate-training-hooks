import { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createAttachTokenInterceptor = (
  axiosInstance: AxiosInstance,
  getAccessToken: () => string | object | null,
) => {
  const _attachAccessToken = (_config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();
    const config = _config;
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  return axiosInstance.interceptors.request.use(_attachAccessToken);
};
