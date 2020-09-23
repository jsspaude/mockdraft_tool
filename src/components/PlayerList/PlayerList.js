/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../contexts/DataContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { counter } from '../../helpers';
import Player from '../Player/Player';

const PlayerList = (props) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const { counterState, counterDispatch } = useContext(CounterContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);

  const handlePlayer = (info) => {
    resultsDispatch({ type: 'draftPlayer', payload: info });
  };
  const newCurrStatus = counter(counterState.currStatus, settingsState.managers);
  const keeperIndexes = () => {
    const keeperIndexArray = [];
    if (settingsState.keeperList) {
      settingsState.keeperList.forEach((keeper) => keeperIndexArray.push(keeper.index));
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
          {Object.keys(dataState.playerData).map((key) => {
            const keeperStatus = keeperIndexes().includes(parseInt(key, 10));
            return (
              <Player
                key={key}
                index={parseInt(key, 10)}
                details={dataState.playerData[key]}
                draftedPlayers={resultsState}
                handlePlayer={handlePlayer}
                currStatus={counterState.currStatus}
                keepers={props.keepers}
                keeperStatus={keeperStatus}
                handleKeeper={props.handleKeeper}
                newCurrStatus={newCurrStatus}
                buttonLabel={props.buttonLabel}
                data={dataState}
                status={!!dataState.playerData[key].drafted}
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
  draftedPlayers: PropTypes.any,
  handlePlayer: PropTypes.func,
};

export default PlayerList;
