import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  ResetPasswordScreen,
  UnlockAccountScreen,
  NotFound,
} from '../screens';
import { ProtectedRoute } from '../components';

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* AUTH */}
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/forgot-password" exact component={ForgotPasswordScreen} />
        <Route path="/reset-password" exact component={ResetPasswordScreen} />
        <Route path="/unlock-account" exact component={UnlockAccountScreen} />

        {/* APP */}
        <ProtectedRoute path="/" exact component={HomeScreen} />

        {/* GLOBAL */}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default RootRouter;
