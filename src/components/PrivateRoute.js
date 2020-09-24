/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ResultsContextProvider from '../contexts/ResultsContextProvider';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (isLoggedIn === true ? (
          <ResultsContextProvider>
            <Component {...props} />
          </ResultsContextProvider>
      ) : (
          <Redirect to="/login" />
      ))
      }
    />
);
export default withRouter(PrivateRoute);
