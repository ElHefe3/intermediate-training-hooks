import ax from 'axios';
import { createNetworkErrorHandlerInterceptor } from '../utils/interceptors';

const axios = ax.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    responseType: 'json',
  },
});

createNetworkErrorHandlerInterceptor(axios);
export default axios;
