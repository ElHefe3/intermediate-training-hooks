import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import _ from 'lodash';

import { AuthRouter } from './auth/auth.router';
import { AppModalRouter, AppRouter } from './app/app.router';
import { GlobalRouter } from './global/global.router';

const Router = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return useRoutes(
    _.concat(AuthRouter, AppRouter, GlobalRouter),
    state?.backgroundLocation ?? location,
  );
};

const ModalRouter = () => {
  return useRoutes(AppModalRouter);
};

export const RootRouter = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Router />
      {state?.backgroundLocation && <ModalRouter />}
    </>
  );
};
