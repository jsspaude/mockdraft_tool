/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { counter } from '../../helpers';
import Player from '../Player/Player';
import Firebase from '../../calls/base';

const PlayerList = (props) => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const newCurrStatus = counter(counterState.currStatus, settingsState.managers);

  const handlePlayer = (info) => {
    resultsDispatch({ type: 'draftPlayer', payload: info });
    Firebase.updateUserData(
      uid,
      { ...info, drafted: counterState.currStatus },
      `playerData/${info.index}`,
    );
  };

  const handleCounter = React.useCallback(() => {
    const newCurrPick = counterState.currPick + 1;
    Firebase.updateUserData(
      uid,
      { keeperPicks: counterState.keeperPicks, currPick: newCurrPick, currStatus: newCurrStatus },
      'userSettings/counter',
    );
    counterDispatch({
      type: 'setCurr',
      currPick: newCurrPick,
      currStatus: newCurrStatus,
    });
  }, [counterDispatch, counterState.currPick, counterState.keeperPicks, newCurrStatus, uid]);

  const keeperIndexes = () => {
    const keeperIndexArray = [];
    if (settingsState.keeperList) {
      settingsState.keeperList.forEach((keeper) => keeperIndexArray.push(keeper.index));
    }
    return keeperIndexArray;
  };

  React.useEffect(() => {
    if (counterState.keeperPicks && counterState.keeperPicks.includes(counterState.currStatus)) {
      handleCounter();
    }
  }, [
    counterState.keeperPicks,
    counterState.currStatus,
    newCurrStatus,
    settingsState.counter,
    handleCounter,
  ]);

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
                handleCounter={handleCounter}
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
