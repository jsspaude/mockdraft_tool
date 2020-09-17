/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import App from './App/App';
import ProtectedRouteHoc from './ProtectedRouteHoc';
import AuthContextProvider from './AuthContextProvider';

const Router = () => (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route key="/" exact path="/">
            <Login />
          </Route>
          <Route key="/signup" path="/signup">
            <SignUp />
          </Route>
          <ProtectedRouteHoc component={App} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
);
export default Router;
