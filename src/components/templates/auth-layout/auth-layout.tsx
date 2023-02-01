import React from 'react';
import { Outlet } from 'react-router-dom';

import { OptionalChildrenProps } from '@project/types';

export const AuthLayout: React.FC<OptionalChildrenProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen grid grid-cols-2">
      <div className="bg-auth-background bg-center bg-cover" />
      <div className="flex justify-center">{children || <Outlet />}</div>
    </div>
  );
};
