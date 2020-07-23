/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useContext } from 'react';
import { AuthContext } from './AuthContextProvider';
import createInitialState, { getCsvData, reducePlayerObject } from '../calls/csvData';
import Firebase from '../calls/base';

const initialState = {};
const DataContext = React.createContext(initialState);
const { Provider } = DataContext;

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/ create an initial state action for adding csv

const DataContextProvider = ({ children }) => {
  const [uid, setUid] = useContext(AuthContext);
  const draftReducer = (data, action) => {
    switch (action.type) {
      case 'draft':
        return {
          ...data,
          drafted: true,
        };
      case 'init':
        return getCsvData()
          .then((result) => reducePlayerObject(result.data))
          .then((obj) => {
            Firebase.setUserData(uid, obj, 'playerData');
            console.log(obj);
            return { ...obj };
          });
      case 'resume':
        return Firebase.collectData(uid).then((res) => res);
      default:
        return initialState;
    }
  };
  const [state, dispatch] = useReducer(draftReducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { DataContext };

export default DataContextProvider;
