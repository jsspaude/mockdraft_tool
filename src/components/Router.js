/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import App from './App/App';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './AuthContextProvider';

const Router = () => {
  const { uid, setUid } = React.useContext(AuthContext);
  const isLoggedIn = !!uid;

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <PrivateRoute isLoggedIn={isLoggedIn} key="/" exact path={`/${uid}`} component={App} />
        <Route key="/signup" exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
