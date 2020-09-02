/* eslint-disable no-unused-vars */
import React, { useReducer, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';

const DataContext = React.createContext(null);
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

const initialState = {
  playerData: {},
  userSettings: {
    currPick: 1,
    currStatus: 1.0,
    positions: { ...defaultPos },
    names: '',
  },
  inProgress: false,
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'storeSettings':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          ...action.payload,
        },
        inProgress: true,
      };
    case 'managerNames':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          names: {
            ...state.userSettings.names,
            [action.index]: action.payload,
          },
        },
      };
    case 'positions':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          positions: {
            ...state.userSettings.positions,
            [action.label]: action.payload,
          },
        },
      };
    case 'managerInput':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          managers: action.payload,
        },
      };
    case 'loadSettings':
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      return null;
  }
};

const DataContextProvider = (props) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useLayoutEffect(() => {
    async function initData() {
      const response = await Firebase.collectData(props.uid);
      dispatch({ type: 'loadSettings', payload: response });
      if (!response) {
        await createCsvObject(props.uid).then((data) => {
          Firebase.setUserData(props.uid, { ...initialState, playerData: data }, 'data');
          return dispatch({ type: 'loadSettings', payload: { playerData: data } });
        });
      }
    }
    initData();
  }, [props.uid]);

  return <DataContext.Provider value={{ state, dispatch }}>{props.children}</DataContext.Provider>;
};

DataContextProvider.propTypes = {
  uid: PropTypes.string,
};

export { DataContext, initialState };

export default DataContextProvider;
