/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextProvider';

const CurrPickContext = createContext('');

const CurrPickContextProvider = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [currPick, setCurrPick] = useState(state.userSettings.currPick);
  return (
    <CurrPickContext.Provider value={{ currPick, setCurrPick }}>
      {props.children}
    </CurrPickContext.Provider>
  );
};

CurrPickContextProvider.propTypes = {
  userSettings: PropTypes.object,
};

export { CurrPickContext };

export default CurrPickContextProvider;
