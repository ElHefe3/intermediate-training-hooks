import React from 'react';
import { useSelector } from 'react-redux';

import { AppLayout } from '../../../components';
import { userSelector } from '../../../reducers';

export const HomeScreen: React.FC = () => {
  const { user } = useSelector(userSelector);

  return (
    <AppLayout>
      <div className="p-5">
        <p>Welcome, {user.email}</p>
      </div>
    </AppLayout>
  );
};
