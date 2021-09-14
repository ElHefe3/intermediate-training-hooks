import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { accessTokenOperations } from '../../../services';

export const ProtectedRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = accessTokenOperations.get();

  if (Component) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
  return null;
};
