/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const CounterContext = createContext('');

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
