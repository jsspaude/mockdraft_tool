/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextProvider';
import PlayerList from './PlayerList';
import Managers from './Managers';

const Draft = (props) => {
  // const initialData = useContext(DataContext);
  // const { dispatch } = initialData;

  useEffect(() => {
    // dispatch({ type: 'init' });
    // console.log(initialData);
  }, []);

  const handlePlayer = (info) => {
    console.log(info);
  };
  return (
    <div className="mock-draft">
      {/* <PlayerList {...props} handlePlayer={handlePlayer} />
      <Managers {...props} /> */}
    </div>
  );
};
export default Draft;
