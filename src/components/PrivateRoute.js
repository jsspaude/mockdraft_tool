/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import App from './App/App';
import DataContextProvider from './DataContextProvider';
import SettingsContextProvider from './SettingsContextProvider';
import ResultsContextProvider from './ResultsContextProvider';
import { AuthContext } from './AuthContextProvider';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedIn === true ? (
        <DataContextProvider>
          <SettingsContextProvider>
            <ResultsContextProvider>
              <Component {...props} />
            </ResultsContextProvider>
          </SettingsContextProvider>
        </DataContextProvider>
    ) : (
        <Redirect to="/login" />
    ))
    }
  />
);
export default withRouter(PrivateRoute);
