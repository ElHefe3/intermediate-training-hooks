import { AxiosError, AxiosInstance } from 'axios';

import { ErrorObject } from './types';

const serverNetworkError = (axiosError: AxiosError<unknown, unknown>): ErrorObject<unknown> => ({
  statusCode: axiosError?.response?.status ?? 0,
  message: axiosError?.message ?? 'Server Network Error',
  serverError: axiosError?.response?.data ?? {},
  axiosError,
});

const clientNetworkError = (axiosError: AxiosError<unknown, unknown>): ErrorObject<unknown> => {
  const status = axiosError.response?.status ?? 0;

  return {
    statusCode: status,
    message: axiosError?.message ?? `Request failed with status code ${status}`,
    serverError: axiosError?.response?.data ?? {},
    axiosError,
  };
};

const serverNotFoundError = (): ErrorObject<unknown> => ({
  statusCode: 404,
  message: 'Server not found',
});

const unknownNetworkError = (axiosError: AxiosError): ErrorObject<unknown> => ({
  statusCode: 0,
  message: 'Something terrible happened',
  axiosError,
});

export const createNetworkErrorHandlerInterceptor = (axiosInstance: AxiosInstance) => {
  const _serverResponded = (error: AxiosError) => error?.response ?? false;
  const _serverSideError = (statusCode: number) => statusCode >= 500;
  const _clientSideError = (statusCode: number) => statusCode >= 400;
  const _noResponseFromServer = (error: AxiosError) => error?.request as boolean;

  return axiosInstance.interceptors.response.use(
    (request) => request,
    (error: AxiosError<unknown, unknown>) => {
      let exception;

      if (_serverResponded(error)) {
        const statusCode = error?.response?.status ?? 0;

        if (_serverSideError(statusCode)) {
          exception = serverNetworkError(error);
        } else if (_clientSideError(statusCode)) {
          exception = clientNetworkError(error);
        } else {
          if (_noResponseFromServer(error)) {
            exception = serverNotFoundError();
          } else {
            exception = unknownNetworkError(error);
          }
        }
      } else if (_noResponseFromServer(error)) {
        exception = serverNotFoundError();
      } else {
        exception = unknownNetworkError(error);
      }

      return Promise.reject(exception);
    },
  );
};
