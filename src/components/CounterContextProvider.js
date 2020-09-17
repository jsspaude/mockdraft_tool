/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextProvider';

// IMPROVEMENT: switch to a userReducer and use counter from helpers as reducer function

const CounterContext = createContext(null);

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'setCurr':
      return {
        currPick: action.payload.currPick,
        currStatus: action.payload.currStatus,
      };
    default:
      return null;
  }
};

const CounterContextProvider = (props) => {
  const { state, disptch } = useContext(DataContext);
  const [counterState, counterDispatch] = useReducer(counterReducer, state.userSettings.counter);

  return (
    <CounterContext.Provider value={{ counterState, counterDispatch }}>
      {props.children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  userSettings: PropTypes.object,
};

export { CounterContext };

export default CounterContextProvider;
