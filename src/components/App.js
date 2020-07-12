/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect, useContext } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import Header from './Header';
import routes from './routes';
import protectedRoutes from './ProtectedRoutes';
import ProtectedRouteHoc from './ProtectedRouteHoc';
import AuthContextProvider, { AuthContext } from './Context';

const App = () => (
    <AuthContextProvider>
      <BrowserRouter>
        <Header routes={routes} />
        <Switch>
          {protectedRoutes.map((route) => (
            <ProtectedRouteHoc
              uid={route.uid}
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
    </AuthContextProvider>
);
export default App;
