/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';
import { AuthContext } from './AuthContextProvider';
import { FirebaseContext } from './FirebaseContextProvider';

const DataContext = React.createContext(null);

const initialState = {
  playerData: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'inProgress':
      return {
        ...state,
        inProgress: action.payload,
      };
    case 'reset':
      return {
        ...state,
        inProgress: false,
        playerData: { ...action.payload },
      };
    case 'draft':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          [action.index]: action.payload,
        },
      };
    case 'loadData':
      return {
        ...state,
        inProgress: action.progress,
        playerData: { ...action.payload },
      };
    default:
      return state;
  }
};

const DataContextProvider = (props) => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { firebaseState, setFirebaseState } = React.useContext(FirebaseContext);
  const [dataState, dataDispatch] = React.useReducer(dataReducer, initialState);

  React.useLayoutEffect(() => {
    if (uid) {
      const initData = () => {
        firebaseState.then((res) => {
          if (res.inProgress) {
            return dataDispatch({
              type: 'loadData',
              payload: res.playerData,
              progress: res.inProgress,
            });
          }
          return createCsvObject(uid).then((data) => {
            const newInitialState = initialState;
            Firebase.setUserData(uid, { ...initialState, playerData: data }, 'data');
            newInitialState.playerData = data;
            return dataDispatch({ type: 'loadSettings', payload: newInitialState });
          });
        });
      };
      initData();
    }
  }, [uid, firebaseState]);

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, initialState };

export default DataContextProvider;
