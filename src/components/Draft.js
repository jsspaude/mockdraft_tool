/* eslint-disable no-unused-vars */
import React, { useContext, useState, useLayoutEffect } from 'react';
import PlayerList from './PlayerList';
import ManagersList from './ManagersList';
import { DataContext } from './DataContextProvider';
import CounterContextProvider from './CounterContextProvider';
import CurrPickContextProvider from './CurrPickContextProvider';

const Draft = (props) => {
  const { state, dispatch } = useContext(DataContext);

  const draftedPlayers = () => {
    if (state.playerData) {
      let playerData = [];
      if (Array.isArray(state.playerData)) {
        playerData = state.playerData;
      } else {
        playerData = [state.playerData];
      }
      const req = playerData
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

  const handlePlayer = (info) => {
    const newDrafted = [...drafted, info];
    setDrafted(newDrafted);
  };
  // HERE - going down rabbit hole of useCallback
  const handlePlayerCallback = useCallback(
    (info) => {
      handlePlayer(info);
    },
    [handlePlayer],
  );

  const createDraftedArrays = useCallback(() => {
    if (state.userSettings.keeperList) {
      state.userSettings.keeperList.forEach((player) => {
        const round = parseInt(player.round, 10);
        const manager = (parseInt(player.manager, 10) - 1) * 0.01;
        const keeperDrafted = round + manager;
        handlePlayerCallback({ ...state.playerData[player.index], drafted: keeperDrafted });
        draftedPlayers();
      });
    }
  }, [draftedPlayers, state.playerData, state.userSettings.keeperList, handlePlayerCallback]);

  useLayoutEffect(() => {
    createDraftedArrays();
  }, [createDraftedArrays]);

  return (
    <div className="draft-main">
      <CounterContextProvider userSettings={state.userSettings}>
        <CurrPickContextProvider>
          <PlayerList
            {...props}
            draftedPlayers={draftedPlayers}
            buttonLabel="DRAFT"
            handlePlayer={handlePlayer}
          />
        </CurrPickContextProvider>
      </CounterContextProvider>
      <ManagersList draftedPlayers={drafted} {...props} />
    </div>
  );
};
export default Draft;
