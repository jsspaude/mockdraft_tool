/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext('');

const AuthContextProvider = (props) => {
  console.log('test');
  AuthContextProvider.propTypes = {
    children: PropTypes.element,
  };
  const [uid, setUid] = useState(false);
  return (
    <AuthContext.Provider uid={uid} value={[uid, setUid]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextProvider;
