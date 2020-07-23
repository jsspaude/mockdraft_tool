/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import routes from './routes';
import protectedRoutes from './ProtectedRoutes';
import ProtectedRouteHoc from './ProtectedRouteHoc';
import AuthContextProvider from './AuthContextProvider';
import DataContextProvider from './DataContextProvider';
import UserSettingsContextProviders from './UserSettingsContextProviders';

const Router = () => (
  <AuthContextProvider>
    <DataContextProvider>
      <BrowserRouter>
        <Header routes={routes} />
        <Switch>
          {protectedRoutes.map((route) => (
            <ProtectedRouteHoc
              key={route.path}
              path={route.path}
              component={route.main}
              exact={route.exact}
              public={route.public}
            />
          ))}
          {routes.map((route) => (
            <Route
              key={route.path}
              uid={route.uid}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </DataContextProvider>
  </AuthContextProvider>
);
export default Router;
