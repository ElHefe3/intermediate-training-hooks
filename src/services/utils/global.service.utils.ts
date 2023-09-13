import { AxiosError } from 'axios';

export const rejectPromise = (err: AxiosError) => {
  return Promise.reject(err);
};
