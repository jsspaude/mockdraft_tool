/* eslint-disable no-unused-vars */
import React, { useLayoutEffect } from 'react';
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
import { DataContext, initialState } from '../contexts/DataContextProvider';
import { SettingsContext } from '../contexts/SettingsContextProvider';
import Firebase from '../calls/base';
import { createCsvObject } from '../calls/csvData';

const date = new Date();
const components = [
  date.getYear(),
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
  date.getMilliseconds(),
];
const id = components.join('');

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
  }, [dataState.inProgress]);

  const handleReset = async (e) => {
    e.preventDefault();
    const resultsObject = { playerData: dataState.playerData, posData: settingsState.positions };
    await Firebase.updateResultsData(uid, resultsObject, id).then(() => Firebase.removeData(uid, '/data').then(() => {
      createCsvObject(uid).then((data) => {
        Firebase.setUserData(uid, { ...initialState, playerData: data }, 'data');
      });
    }));
  };
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
