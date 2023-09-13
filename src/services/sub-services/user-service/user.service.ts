import { AxiosResponse } from 'axios';

import { User } from '@project/components';
import { authNetworkService, UserApi } from '@project/services';
import { userApiSchema, usersApiSchema } from './schemas';
import { userDto } from './user.dto';
import userUrls from './user.urls';

const getCurrentUser = () => {
  const url = userUrls.getCurrentUserUrl();

  return authNetworkService
    .get(url)
    .then((apiResponse: AxiosResponse<UserApi>) => apiResponse?.data);
};

const getUsers = (page: number, per: number, getArchived: boolean) => {
  const url = getArchived
    ? userUrls.getArchivedUsersUrl(page, per)
    : userUrls.getUsersUrl(page, per);

  return authNetworkService
    .get(url)
    .then((apiResponse: AxiosResponse) => usersApiSchema.parse(apiResponse.data));
};

const getUser = (id: number) => {
  const url = userUrls.getUserUrl(id);

  return authNetworkService
    .get(url)
    .then((apiResponse: AxiosResponse) => userApiSchema.parse(apiResponse.data));
};

const updateUser = (id: number, formData: User) => {
  const url = userUrls.getUserUrl(id);
  const dto = userDto(formData);

  return authNetworkService.patch(url, dto).then((resp: AxiosResponse<UserApi>) => resp?.data);
};

const createUser = (formData: User) => {
  const url = userUrls.getUsersUrl();
  const dto = userDto(formData);

  return authNetworkService.post(url, dto).then((resp: AxiosResponse<UserApi>) => resp?.data);
};

const archiveUser = (id: number) => {
  const url = userUrls.getUserUrl(id);

  return authNetworkService.delete(url);
};

const restoreUser = (id: number) => {
  const url = userUrls.restoreUserUrl(id);

  return authNetworkService.patch(url);
};

export default {
  getCurrentUser,
  getUsers,
  getUser,
  updateUser,
  createUser,
  archiveUser,
  restoreUser,
};
