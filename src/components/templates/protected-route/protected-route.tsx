import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { accessTokenOperations } from '@project/services';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuthenticated = accessTokenOperations.get();

  if (!!isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
