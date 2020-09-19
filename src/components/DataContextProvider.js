/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';
import { AuthContext } from './AuthContextProvider';

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
  userSettings: {
    counter: {
      currPick: 1,
      currStatus: 1.0,
      keeperPicks: {},
    },
    positions: { ...defaultPos },
    names: '',
  },
  inProgress: false,
  playerData: [],
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
    case 'managerInput':
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          managers: action.payload,
        },
      };
    case 'draftPlayer':
      return { ...state, ...action.payload };
    case 'inProgress':
      return {
        ...state,
        inProgress: action.payload,
      };
    case 'reset':
      return {
        ...state,
        playerData: { ...action.payload },
      };
    case 'loadSettings':
      return {
        ...action.payload,
      };
    default:
      return null;
  }
};

const initData = async (uid) => {
  const response = await Firebase.collectData(uid);
  if (!response || !response.inProgress) {
    await createCsvObject(uid).then((data) => {
      Firebase.setUserData(uid, { ...initialState, playerData: data }, 'data');
      initialState.playerData = data;
      return initialState;
    });
  }
  return response;
};

const DataContextProvider = (props) => {
  const { uid, setUid } = useContext(AuthContext);
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    initData(uid).then((res) => {
      dispatch({ type: 'loadSettings', payload: res });
    });
  }, [uid]);

  return <DataContext.Provider value={{ state, dispatch }}>{props.children}</DataContext.Provider>;
};

DataContextProvider.propTypes = {
  uid: PropTypes.string,
};

export { DataContext, initialState };

export default DataContextProvider;
