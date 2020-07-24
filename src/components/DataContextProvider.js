/* eslint-disable no-unused-vars */
import React, {
  useState, useReducer, useContext, useEffect,
} from 'react';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';

const DataContext = React.createContext(null);
const dataReducer = (state, action) => {
  switch (action.type) {
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

const DataContextProvider = ({ children }) => {
  const [initialData, setInitialData] = useState(null);
  const [state, dispatch] = useReducer(dataReducer, initialData);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};
export { DataContext };

export default DataContextProvider;
