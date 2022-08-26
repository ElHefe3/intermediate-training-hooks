import { useEffect, useState } from 'react';

import { UserData, userDataModel, useUsersQuery } from '@project/queries';
import { paginationModel } from '@project/models';

export const useUsersData = (getArchived = false) => {
  const [userData, setUserData] = useState<UserData>({
    users: [],
    pagination: paginationModel(),
  });

  const usersQuery = useUsersQuery(0, getArchived);

  useEffect(() => {
    const data = userDataModel(usersQuery.data);
    setUserData(data);
  }, [usersQuery?.data]);

  return { ...usersQuery, data: userData };
};
