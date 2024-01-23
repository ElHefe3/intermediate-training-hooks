import { useLocation, useRoutes } from 'react-router-dom';
import concat from 'lodash/concat';

import { AppModalRouter, AppRouter } from './app/app.router';
import { GlobalRouter } from './global/global.router';
import { AuthRouter } from './auth/auth.router';

const Router = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return useRoutes(
    concat(AuthRouter, AppRouter, GlobalRouter),
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
