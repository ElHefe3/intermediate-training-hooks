import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

export const getData = (apiResponse: AxiosResponse) => _.get(apiResponse, 'data');

export const rejectPromise = (err: AxiosError) => {
  return Promise.reject(err);
};
