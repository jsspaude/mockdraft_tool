/* eslint-disable no-unused-vars */
import React, {
  useReducer, useContext, createContext, useLayoutEffect,
} from 'react';
import { SettingsContext } from './SettingsContextProvider';

const CounterContext = createContext(null);

const initialState = {
  currPick: 1,
  currStatus: 1.0,
  keeperPicks: [],
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'initialize':
      return {
        ...action.payload,
      };
    case 'setCurr':
      console.log(state);
      return {
        ...state,
        currPick: action.currPick,
        currStatus: action.currStatus,
      };
    default:
      return null;
  }
};

const CounterContextProvider = (props) => {
  const { settingsState, settingsDisptch } = useContext(SettingsContext);
  const [counterState, counterDispatch] = useReducer(counterReducer, initialState);

  useLayoutEffect(() => {
    counterDispatch({ type: 'initialize', payload: settingsState.counter });
  }, [settingsState.counter]);
  return (
    <CounterContext.Provider value={{ counterState, counterDispatch }}>
      {props.children}
    </CounterContext.Provider>
  );
};

export { CounterContext };

export default CounterContextProvider;
