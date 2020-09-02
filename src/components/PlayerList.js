/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextProvider';
import { CounterContext } from './CounterContextProvider';
import { counter } from '../helpers';
import Player from './Player';

const PlayerList = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { currStatus, setCurrStatus } = useContext(CounterContext);
  const newCurrStatus = counter(currStatus, state.userSettings.managers);
  const keeperIndexes = () => {
    const keeperIndexArray = [];
    if (state.userSettings.keeperList) {
      state.userSettings.keeperList.forEach((keeper) => keeperIndexArray.push(keeper.index));
    }
    return keeperIndexArray;
  };

  return (
    <div className="player-list">
      <table className="players">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(state.playerData).map((key) => {
            const keeperStatus = keeperIndexes().includes(parseInt(key, 10));
            return (
              <Player
                key={key}
                index={parseInt(key, 10)}
                details={state.playerData[key]}
                draftedPlayers={props.draftedPlayers}
                handlePlayer={props.handlePlayer}
                user={props.uid}
                currStatus={currStatus}
                keepers={props.keepers}
                keeperStatus={keeperStatus}
                handleKeeper={props.handleKeeper}
                newCurrStatus={newCurrStatus}
                buttonLabel={props.buttonLabel}
                data={state}
                status={!!state.playerData[key].drafted}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

PlayerList.propTypes = {
  data: PropTypes.object,
  uid: PropTypes.string,
  draftedPlayers: PropTypes.func,
  handlePlayer: PropTypes.func,
};

export default PlayerList;
