import { AxiosError, AxiosResponse } from 'axios';

export const getData = (apiResponse: AxiosResponse) => apiResponse?.data;

export const rejectPromise = (err: AxiosError) => {
  return Promise.reject(err);
};
