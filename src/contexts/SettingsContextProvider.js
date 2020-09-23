/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useLayoutEffect } from 'react';
import { DataContext } from './DataContextProvider';
import { FirebaseContext } from './FirebaseContextProvider';

const SettingsContext = React.createContext(null);

const defaultPos = {
  QB: 1,
  RB: 2,
  WR: 2,
  TE: 1,
  WR_RB_TE: 2,
  DST: 1,
  K: 1,
  BENCH: 5,
  WR_RB: 0,
  WR_TE: 0,
  RB_TE: 0,
  QB_WR_RB_TE: 0,
};

const defaultSettings = {
  keeperList: [false],
  managers: 10,
  positions: { ...defaultPos },
  counter: {
    currPick: 1,
    currStatus: 1.0,
    keeperPicks: false,
  },
  names: '',
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'keeperList':
      return {
        ...state,
        keeperList: action.payload,
      };
    case 'managers':
      return {
        ...state,
        managers: action.payload,
      };
    case 'rounds':
      return {
        ...state,
        rounds: action.payload,
      };
    case 'positions':
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.label]: action.payload,
        },
      };
    default:
      return defaultSettings;
  }
};

const initData = (state) => {
  if (state.inProgress) {
    return { ...state.userSettings };
  }
  return defaultSettings;
};

const SettingsContextProvider = (props) => {
  const { dataState, setDataState } = React.useContext(DataContext);
  const { firebaseState, setFirebaseState } = React.useContext(FirebaseContext);
  const [settingsState, settingsDispatch] = useReducer(settingsReducer, initData(dataState));

  return (
    <SettingsContext.Provider value={{ settingsState, settingsDispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };

export default SettingsContextProvider;
