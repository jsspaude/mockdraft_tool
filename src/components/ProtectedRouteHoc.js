/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes, { bool, any, object } from 'prop-types';
import { AuthContext } from './AuthContextProvider';

const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
  ProtectedRouteHoc.propTypes = {
    component: PropTypes.any,
    rest: PropTypes.object,
    props: PropTypes.object,
  };
  const [uid, setUid] = useContext(AuthContext);
  if (uid || rest.public) {
    return <Route {...rest} render={(props) => <Component {...props}></Component>} />;
  }
  return <Redirect to={{ pathname: '/' }} />;
};

export default withRouter(ProtectedRouteHoc);
