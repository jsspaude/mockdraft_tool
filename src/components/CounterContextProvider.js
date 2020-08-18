/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

// IMPROVEMENT: switch to a userReducer and use counter from helpers as reducer function

const CounterContext = createContext('');

const CounterContextProvider = (props) => {
  const [currStatus, setCurrStatus] = useState(props.userSettings.currStatus);
  return (
    <CounterContext.Provider value={{ currStatus, setCurrStatus }}>
      {props.children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  userSettings: PropTypes.object,
};

export { CounterContext };

export default CounterContextProvider;
