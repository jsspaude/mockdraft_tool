/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PlayerList from './PlayerList';
import ManagersList from './ManagersList';
import { DataContext } from './DataContextProvider';

const Draft = (props) => {
  const handlePlayer = (info) => {
    console.log(info);
  };

  return (
    <div className="draft-main">
      <PlayerList {...props} handlePlayer={handlePlayer} />
      <ManagersList {...props} />
    </div>
  );
};
export default Draft;
