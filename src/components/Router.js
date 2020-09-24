/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Draft from './Draft/Draft';
import Settings from './Settings/Settings';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../contexts/AuthContextProvider';
import { DataContext } from '../contexts/DataContextProvider';
import { SettingsContext } from '../contexts/SettingsContextProvider';

const Router = () => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const [pending, setPending] = React.useState(true);
  const history = useHistory();
  const isLoggedIn = (x) => !!x;

  React.useEffect(() => {
    if (dataState.inProgress) {
      setPending(false);
    }
    setPending(false);
  }, [dataState.inProgress]);

  if (!pending) {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          {isLoggedIn(uid) && dataState.inProgress && (
            <PrivateRoute
              isLoggedIn={isLoggedIn(uid)}
              key="/"
              exact
              path={['/', `/${uid}`, `/${uid}/draft`]}
              component={Draft}
            />
          )}
          {isLoggedIn(uid) && !dataState.inProgress && (
            <PrivateRoute
              isLoggedIn={isLoggedIn(uid)}
              key="/"
              exact
              path={['/', `/${uid}`, `/${uid}/settings`]}
              component={Settings}
            />
          )}
          <Route exact path={['/', '/login']} render={(props) => <Login {...props} />} />
          <Route key="/signup" exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
  return <>Loading...</>;
};
export default Router;
