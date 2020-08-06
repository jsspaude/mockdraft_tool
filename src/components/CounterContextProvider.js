/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { counter } from '../helpers';

const CounterContext = createContext('');

function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return action.payload;
    }
    case 'decrement': {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const CounterContextProvider = (props) => {
  const [currStatus, setCurrStatus] = useState(props.userSettings.currStatus);

  return (
    <CounterContext.Provider value={[currStatus, setCurrStatus]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export { CounterContext };

export default CounterContextProvider;
