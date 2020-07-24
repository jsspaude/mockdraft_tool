/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext('');

const AuthContextProvider = ({ children }) => {
  const [uid, setUid] = useState(false);
  return (
    <AuthContext.Provider uid={uid} value={[uid, setUid]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextProvider;
