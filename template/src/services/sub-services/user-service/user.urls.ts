import config from '../../../config';

const userBaseUrl = `${config.apiUrl()}/users`;

export default {
  getUserUrl: () => `${userBaseUrl}/show_details`,
};
