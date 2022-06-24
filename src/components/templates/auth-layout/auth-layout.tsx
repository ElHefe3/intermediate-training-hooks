import React from 'react';

import { ChildrenProps } from '@project/types';

export const AuthLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen grid grid-cols-2">
      <div className="bg-auth-background bg-center bg-cover" />
      <div className="flex justify-center">{children}</div>
    </div>
  );
};
