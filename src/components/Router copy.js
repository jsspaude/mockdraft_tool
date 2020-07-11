/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import firebase from 'firebase';
import Header from './Header';
import routes from './routes';
import protectedRoutes from './ProtectedRoutes';
import ProtectedRouteHoc from './ProtectedRouteHoc';
import { base } from '../base';
import AuthContext from './Context';
import AuthHandler, { useAuth } from '../AuthHandler';

const Router = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        AuthHandler({ user });
        setLoggedIn(true);
        setUid(user.uid);
      }
    });
  });

  // if (isLoggedIn) {
  //   return (
  //     <BrowserRouter>
  //       <Redirect to={'/draft'} />
  //     </BrowserRouter>
  //   );
  // }
  return (
  // have to put here if uid then redirect to protected routes or to draft/uid

    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      Is logged in? {JSON.stringify(isLoggedIn)}
      <BrowserRouter>
        {/* <Header
          isLoggedIn={isLoggedIn}
          authContext={AuthContext}
          routes={routes}
          uidContext={UidContext}
        /> Prob don't need this here */}
        <Switch>
          {protectedRoutes.map((route) => (
            <ProtectedRouteHoc
              key={route.path}
              isLoggedIn={isLoggedIn}
              path={route.path}
              component={route.main}
              exact={route.exact}
              public={route.public}
            />
          ))}
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.main} />
          ))}
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default Router;
