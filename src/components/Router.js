/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import routes from './routes';
import Login from './Login';
import SignUp from './SignUp';
import protectedRoutes from './ProtectedRoutes';
import ProtectedRouteHoc from './ProtectedRouteHoc';
import AuthContextProvider from './AuthContextProvider';

const Router = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Header routes={routes} />
      <Switch>
        <Route key="/" exact path="/">
          <Login />
        </Route>
        <Route key="/signup" path="/signup">
          <SignUp />
        </Route>
        {protectedRoutes.map((route) => (
          <ProtectedRouteHoc
            key={route.path}
            path={route.path}
            component={route.main}
            exact={route.exact}
            public={route.public}
          />
        ))}
      </Switch>
    </BrowserRouter>
  </AuthContextProvider>
);
export default Router;
