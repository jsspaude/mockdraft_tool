/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext('');

// MOVE APP getWRiteData to here?

const DataContextProvider = (props) => {
  DataContextProvider.propTypes = {
    children: PropTypes.element,
  };
  const [playerData, setPlayerData] = useState('');
  return (
    <DataContext.Provider value={[playerData, setPlayerData]}>
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext };

export default DataContextProvider;
