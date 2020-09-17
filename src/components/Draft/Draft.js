/* eslint-disable no-unused-vars */
import React, { useContext, useState, useLayoutEffect } from 'react';
import PlayerList from '../PlayerList/PlayerList';
import ManagerList from '../ManagerList/ManagerList';
import { DataContext } from '../DataContextProvider';
import ResultsContextProvider from '../ResultsContextProvider';
import CounterContextProvider from '../CounterContextProvider';

const draftedPlayers = (playerData) => {
  if (playerData) {
    let playerDataArray = [];
    if (Array.isArray(playerData)) {
      playerDataArray = playerData;
    } else {
      playerDataArray = Object.entries(playerData);
    }
    const req = playerDataArray
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

const Draft = (props) => {
  const { state, dispatch } = useContext(DataContext);

  // HERE COMBINE THIS LAYOUT EFFECT AND DRAFTED PLAYERS
  // INTO DATA CONTEXT TO AVOID MULTIPLE RENDERING OF MANAGERLIST
  // useLayoutEffect(() => {
  //   if (state.userSettings.keeperList) {
  //     // state.userSettings.keeperList.forEach((player) => {
  //     //   const round = parseInt(player.round, 10);
  //     //   const manager = (parseInt(player.manager, 10) - 1) * 0.01;
  //     //   const keeperDrafted = round + manager;
  //     //   handlePlayer({ ...state.playerData[player.index], drafted: keeperDrafted });
  //     // });
  //   }
  //   // DISABLED ESLINT EXHAUSTIVE DEPENDENCIES DUE TO IT'S CREATION OF A LOOP
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="draft-main">
      <ResultsContextProvider>
        <CounterContextProvider userSettings={state.userSettings}>
          <PlayerList {...props} buttonLabel="DRAFT" />
        </CounterContextProvider>
        <ManagerList {...props} />
      </ResultsContextProvider>
    </div>
  );
};

export { draftedPlayers };
export default Draft;
