/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayerList';
import Managers from './Managers';

const Draft = (props) => {
  const [currPlayer, updateCurrPlayer] = useState('');
  const handlePlayer = (info) => {
    console.log(info);
  };
  return (
    <div className="mock-draft">
      <PlayerList {...props} handlePlayer={handlePlayer} />
      <Managers {...props} />
    </div>
  );
};
export default Draft;
