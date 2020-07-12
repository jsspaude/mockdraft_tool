/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';

const ProtectedRouteHoc = ({ component: Component, uid, ...rest }) => {
  console.log(uid);
  if (uid || rest.public) {
    return <Route {...rest} render={(props) => <Component {...props}></Component>} />;
  }
  return <Redirect to={{ pathname: '/' }} />;
};

ProtectedRouteHoc.propTypes = {
  component: any,
  isLoggedIn: bool,
  rest: object,
  props: object,
};

export default withRouter(ProtectedRouteHoc);
