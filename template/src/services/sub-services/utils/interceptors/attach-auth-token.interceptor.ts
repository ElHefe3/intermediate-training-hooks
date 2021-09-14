import { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAttachTokenInterceptor = (axiosInstance: AxiosInstance, getAccessToken: Function) => {
  const _attachAccessToken = (_config: AxiosRequestConfig) => {
    const accessToken = getAccessToken();
    const config = _config;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  };

  return axiosInstance.interceptors.request.use(_attachAccessToken);
};
export default createAttachTokenInterceptor;
