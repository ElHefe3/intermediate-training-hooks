import { AxiosError, AxiosInstance } from 'axios';
import _ from 'lodash';

import {
  ServerNetworkError,
  ClientNetworkError,
  ServerNotFoundError,
} from '@project/services/exceptions';

export const createNetworkErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  const _serverResponded = (error: AxiosError) => error.response;
  const _serverSideError = (statusCode: number) => statusCode >= 500;
  const _clientSideError = (statusCode: number) => statusCode >= 400;
  const _noResponseFromServer = (error: AxiosError) => error.request;

  return axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      let exception;

      if (
        error instanceof ClientNetworkError ||
        error instanceof ServerNetworkError ||
        error instanceof ServerNotFoundError
      ) {
        return Promise.reject(error);
      }

      if (_serverResponded(error)) {
        const statusCode = _.get(error, 'response.status');

        if (_serverSideError(statusCode)) {
          exception = new ServerNetworkError(statusCode, error.response.data);
        } else if (_clientSideError(statusCode)) {
          exception = new ClientNetworkError(statusCode, error.response.data);
        }
      } else if (_noResponseFromServer(error)) {
        exception = new ServerNotFoundError('Server is probably offline');
      } else {
        exception = new Error('Something terrible happened');
      }

      console.warn(exception);
      return Promise.reject(exception);
    },
  );
};
