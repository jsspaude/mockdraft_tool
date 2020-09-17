/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import App from './App/App';
import DataContextProvider from './DataContextProvider';
import { AuthContext } from './AuthContextProvider';

const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
  const [uid, setUid] = useContext(AuthContext);
  const isLogin = () => !!uid;
  return (
    <Route
      {...rest}
      render={(props) => (isLogin() ? (
          <DataContextProvider {...props}>
            <Component {...props} />
          </DataContextProvider>
      ) : (
          <Redirect to="/" />
      ))
      }
    />
  );
};

export default withRouter(ProtectedRouteHoc);

// HERE NEED TO PASS UID
