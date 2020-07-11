/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';

const AuthContext = createContext('');

const AuthContextProvider = (props) => {
  const [uid, setUid] = useState(false);
  return <AuthContext.Provider value={[uid, setUid]}>{props.children}</AuthContext.Provider>;
};

export { AuthContext };

export default AuthContextProvider;
