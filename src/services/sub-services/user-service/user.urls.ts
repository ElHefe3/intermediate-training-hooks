import config from '../../../config';

const userBaseUrl = `${config.apiUrl}/users`;

export default {
  getCurrentUserUrl: () => `${userBaseUrl}/show_details`,
  getUsersUrl: (page?: number) => `${userBaseUrl}${page ? `?page=${page}` : ''}`,
  getArchivedUsersUrl: (page?: number) => `${userBaseUrl}/archived${page ? `?page=${page}` : ''}`,
  getUserUrl: (id: number) => `${userBaseUrl}/${id}`,
  restoreUserUrl: (id: number) => `${userBaseUrl}/${id}/restore`,
};
