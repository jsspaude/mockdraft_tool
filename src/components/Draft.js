/* eslint-disable no-unused-vars */
import React, {
  useContext, useState, useLayoutEffect, useEffect,
} from 'react';
import PlayerList from './PlayerList';
import ManagersList from './ManagersList';
import { DataContext } from './DataContextProvider';

const Draft = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const draftedPlayers = () => {
    if (state.playerData) {
      const req = state.playerData
        .map((player) => {
          if (player.drafted !== false) {
            return player;
          }
          return null;
        })
        .filter((item) => item != null);
      return req;
    }
    return null;
  };

  const playerArray = draftedPlayers();
  const [drafted, setDrafted] = useState(playerArray);

  useLayoutEffect(() => {
    setDrafted(draftedPlayers());
  }, []);

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
