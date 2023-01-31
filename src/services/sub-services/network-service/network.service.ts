import ax from 'axios';

import { createNetworkErrorHandlerInterceptor } from '@project/services/utils';

const axios = ax.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    responseType: 'json',
    // uncomment for C# backends
    // paramsSerializer: {indexes: null}
  },
});

createNetworkErrorHandlerInterceptor(axios);
export default axios;
