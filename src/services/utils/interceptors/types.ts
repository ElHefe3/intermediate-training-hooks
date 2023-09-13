import { AxiosError } from 'axios';

export type ErrorObject<Value> = {
  statusCode: number;
  message: string;
  serverError?: Value;
  axiosError?: AxiosError;
};
