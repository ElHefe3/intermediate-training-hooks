import React from 'react';
import { Outlet } from 'react-router-dom';

import { OptionalChildrenProps } from '@project/types';

export const AuthLayout: React.FC<OptionalChildrenProps> = ({ children }) => {
  return (
    <div className="grid h-screen w-screen grid-cols-2">
      <div className="bg-auth-background bg-cover bg-center" />
      <div className="flex justify-center">{children || <Outlet />}</div>
    </div>
  );
};
