export type OAuthRefreshObject = {
  grant_type: 'refresh_token';
  client_id: string;
  client_secret: string;
  refresh_token: string | null;
};
