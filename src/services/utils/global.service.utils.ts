import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

export const getData = (apiResponse: AxiosResponse) => apiResponse?.data;

export const rejectPromise = (err: AxiosError) => {
  return Promise.reject(err);
};
