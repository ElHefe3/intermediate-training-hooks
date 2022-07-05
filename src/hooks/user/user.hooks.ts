import { useEffect, useState } from 'react';
import _ from 'lodash';

import { UserData, userDataModel, useUsersQuery } from '@project/queries';

export const useUsersData = (getArchived?: boolean) => {
  const [userData, setUserData] = useState<UserData>({
    users: [],
    pagination: { currentPage: 0, totalPages: 0, totalCount: 0 },
  });
  const usersQuery = useUsersQuery(0, getArchived);

  useEffect(() => {
    const data = userDataModel(_.get(usersQuery, 'data', {}));
    setUserData(data);
  }, [usersQuery?.data]);

  return userData;
};
