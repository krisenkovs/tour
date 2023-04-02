import { applicationStore } from 'application/store';
import { observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export const ProtectedRoute = observer((props: RouteProps) => {
  return applicationStore?.isLogin ? <Route {...props} /> : <Redirect to="/" />;
});
