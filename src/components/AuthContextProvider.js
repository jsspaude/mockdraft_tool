/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext('');

const authReducer = (state, action) => {
  switch (action.type) {
    case 'loggedIn':
      return action.payload;
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [uid, setUid] = useReducer(authReducer, false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid({ type: 'loggedIn', payload: user.uid });
      }
      setPending(false);
    });
  }, [uid]);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider uid={uid} value={{ uid, setUid }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextProvider;
