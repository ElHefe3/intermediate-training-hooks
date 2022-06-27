export default {
  hostUrl: import.meta.env.VITE_HOST_URL,
  apiUrl: `${import.meta.env.VITE_HOST_URL}${import.meta.env.VITE_API_LOCATION}/v${
    import.meta.env.VITE_API_VERSION
  }`,
  clientId: import.meta.env.VITE_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  scope: import.meta.env.VITE_CLIENT_SCOPE,
  accessTokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
  rememberMeKey: 'remember_me',
};
