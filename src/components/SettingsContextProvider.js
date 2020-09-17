/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { DataContext } from './DataContextProvider';

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

const defaultSettings = { keeperList: null, managers: 10, positions: { ...defaultPos } };

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
          [action.label]: action.payload,
        },
      };
    default:
      return defaultSettings;
  }
};

const SettingsContextProvider = (props) => {
  const [settingsState, settingsDispatch] = useReducer(settingsReducer, defaultSettings);

  return (
    <SettingsContext.Provider value={{ settingsState, settingsDispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

SettingsContextProvider.propTypes = {
  uid: PropTypes.string,
};

export { SettingsContext };

export default SettingsContextProvider;
