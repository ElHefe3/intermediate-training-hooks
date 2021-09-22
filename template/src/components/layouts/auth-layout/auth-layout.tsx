import React from 'react';

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen w-screen grid grid-cols-2">
      <div className="bg-auth-background bg-center bg-cover" />
      <div className="flex justify-center">{children}</div>
    </div>
  );
};
