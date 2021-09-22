export default {
  hostUrl: process.env.REACT_APP_HOST_URL,
  apiUrl: (version = 1): string => {
    return `${process.env.REACT_APP_HOST_URL}${process.env.REACT_APP_API_LOCATION}/v${version}`;
  },
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  rememberMeKey: 'remember_me',
};
