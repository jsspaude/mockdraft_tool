/* eslint-disable no-unused-vars */
import React from 'react';
import PlayerList from './PlayerList';
import Managers from './Managers';

const Draft = (props) => {
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
