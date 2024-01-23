import config from '@project/config';

const userBaseUrl = `${config.apiUrl}/users`;

export default {
  getCurrentUserUrl: () => `${userBaseUrl}/show_details`,
  getUsersUrl: (page?: number, per?: number) =>
    `${userBaseUrl}${page ? `?page=${page}` : ''}${per ? `?per=${per}` : ''}`,
  getArchivedUsersUrl: (page?: number, per?: number) =>
    `${userBaseUrl}/archived${page ? `?page=${page}` : ''}&${per ? `?per=${per}` : ''}`,
  getUserUrl: (id: number) => `${userBaseUrl}/${id}`,
  restoreUserUrl: (id: number) => `${userBaseUrl}/${id}/restore`,
};
