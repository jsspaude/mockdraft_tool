/* eslint-disable no-unused-vars */
import React, {
  useContext, useState, useLayoutEffect, useEffect,
} from 'react';
import { initializeApp } from 'firebase';
import PlayerList from './PlayerList';
import ManagersList from './ManagersList';
import { DataContext } from './DataContextProvider';

const Draft = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const draftedPlayers = () => state.playerData
    .map((player) => {
      if (player.drafted) {
        return player;
      }
      return null;
    })
    .filter((item) => item != null);

  const [drafted, setDrafted] = useState(draftedPlayers());

  const handlePlayer = (info) => {
    const newDrafted = [...drafted, info];
    setDrafted(newDrafted);
  };

  return (
    <div className="draft-main">
      <PlayerList {...props} draftedPlayers={draftedPlayers} handlePlayer={handlePlayer} />
      <ManagersList draftedPlayers={drafted} {...props} />
    </div>
  );
};
export default Draft;
