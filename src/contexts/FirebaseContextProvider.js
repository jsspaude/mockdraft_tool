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
  const [pending, setPending] = React.useState(true);
  const [firebaseState, firebaseDispatch] = React.useReducer(baseReducer, initBase(uid));

  React.useEffect(() => {
    if (uid) {
      firebaseState.then((res) => firebaseDispatch({ type: 'initialize', payload: res }));
      setPending(false);
    }
    setPending(false);
  }, []);

  if (!pending) {
    return (
      <FirebaseContext.Provider value={{ firebaseState, firebaseDispatch }}>
        {props.children}
      </FirebaseContext.Provider>
    );
  }
  return <>Loading</>;
};

export { FirebaseContext };

export default FirebaseContextProvider;
