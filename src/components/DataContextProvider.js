/* eslint-disable no-unused-vars */
import React, {
  useState, useReducer, useContext, useLayoutEffect,
} from 'react';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';

const DataContext = React.createContext(null);
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
      };
    case 'storeSettings':
      return {
        ...state,
      };
    case 'loadSettings':
      return action.payload;
    default:
      return null;
  }
};

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/ create an initial state action for adding csv

const DataContextProvider = (props) => {
  const [inProgress, setInProgress] = useState(false);
  const [state, dispatch] = useReducer(dataReducer, null);

  useLayoutEffect(() => {
    async function initData() {
      const response = await Firebase.collectData(props.uid);
      dispatch({ type: 'loadSettings', payload: response });
      if (!response) {
        createCsvObject(props.uid).then((data) => {
          dispatch({ type: 'loadSettings', payload: data });
        });
      }
    }
    initData();
  }, []);

  useLayoutEffect(() => {
    if (state) {
      if (state.userSettings.drafting) {
        setInProgress(true);
      }
    }
  }, [state]);

  return (
    <DataContext.Provider value={{ state, dispatch, inProgress }}>
      {inProgress && props.children}
    </DataContext.Provider>
  );
};
export { DataContext };

export default DataContextProvider;
