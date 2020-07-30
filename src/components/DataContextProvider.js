/* eslint-disable no-unused-vars */
import React, { useReducer, useLayoutEffect } from 'react';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';
import { counter } from '../helpers';

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
    currStatus: 1.01,
    positions: { ...defaultPos },
    names: '',
  },
  inProgress: false,
  managerData: '',
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'draftPlayer':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          [action.payload]: {
            ...state.playerData[action.payload],
            drafted: true,
          },
        },
        userSettings: {
          ...state.userSettings,
          currStatus: counter(state.userSettings.currStatus, state.userSettings.managers),
        },
        managerData: {
          ...state.managerData,
          [Number(
            (state.userSettings.currStatus - parseInt(state.userSettings.currStatus, 10)).toFixed(
              2,
            ) * 100,
          )]: state.playerData[action.payload],
        },
      };
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
    case 'reset':
      return initialState;
    case 'loadSettings':
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      return null;
  }
};

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/ create an initial state action for adding csv

const DataContextProvider = (props) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useLayoutEffect(() => {
    async function initData() {
      const response = await Firebase.collectData(props.uid);
      dispatch({ type: 'loadSettings', payload: response });
      if (!response) {
        await createCsvObject(props.uid).then((data) => {
          dispatch({ type: 'loadSettings', payload: { playerData: data } });
        });
      }
    }
    initData();
  }, [props.uid]);

  return <DataContext.Provider value={{ state, dispatch }}>{props.children}</DataContext.Provider>;
};
export { DataContext };

export default DataContextProvider;
