/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { AuthContext } from './AuthContextProvider';

const FirebaseContext = React.createContext(null);

const initBase = async (uid) => {
  if (uid) {
    const res = await Firebase.collectData(uid);
    return res;
  }
  return false;
};

const baseReducer = (state, action) => {
  switch (action.type) {
    case 'initialize':
      return { ...action.payload };
    default:
      return state;
  }
};

const FirebaseContextProvider = (props) => {
  const { uid, setUid } = useContext(AuthContext);
  const [firebaseState, firebaseDispatch] = React.useReducer(baseReducer, initBase(uid));

  return (
    <FirebaseContext.Provider value={{ firebaseState, firebaseDispatch }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext };

export default FirebaseContextProvider;
