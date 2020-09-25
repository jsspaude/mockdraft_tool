/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import Firebase from '../../calls/base';
import { createCsvObject } from '../../calls/csvData';
import { counter, id } from '../../helpers';

const Status = () => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  const history = useHistory();
  const posStripped = (position) => position.replace(/[0-9]/g, '');

  const handleReset = async (e) => {
    e.preventDefault();
    const resultsObject = { playerData: dataState.playerData, posData: settingsState.positions };
    await Firebase.updateResultsData(uid, resultsObject, id).then(() => Firebase.removeData(uid, '/data').then(() => {
      createCsvObject(uid).then((data) => {
        Firebase.setUserData(uid, { playerData: data }, 'data');
        dataDispatch({ type: 'reset', payload: data });
        settingsDispatch({ type: 'reset' });
      });
      history.push('/');
    }));
  };

  const handleWipe = async (e) => {
    e.preventDefault();
    Firebase.removeData(uid, '/results');
  };

  const currRound = () => Math.trunc(counterState.currStatus);

  function currManager() {
    const index = (
      (counterState.currStatus - Math.trunc(counterState.currStatus)).toFixed(2) * 100
    ).toFixed(0);
    const manager = settingsState.names[index];
    if (manager) {
      return manager;
    }
    return `Manager-${index}`;
  }

  function nextManager() {
    const status = counter(counterState.currStatus, settingsState.managers);
    const index = ((status - Math.trunc(status)).toFixed(2) * 100).toFixed(0);
    const manager = settingsState.names[index];
    if (manager) {
      return manager;
    }
    return `Manager-${index}`;
  }

  function prevManager() {
    if (counterState.currStatus > 1 && resultsState.length >= 1) {
      const resultsArray = resultsState.length > 1 ? resultsState[resultsState.length - 1] : resultsState[0];
      const status = resultsArray.drafted;
      const player = resultsArray.overall;
      const pos = posStripped(resultsArray.pos);
      const { team } = resultsArray;
      const index = ((status - Math.trunc(status)).toFixed(2) * 100).toFixed(0);
      const manager = settingsState.names[index];
      if (manager) {
        return {
          player,
          pos,
          team,
          manager,
        };
      }
      return {
        player,
        pos,
        team,
        manager: `Manager-${index}`,
      };
    }
    return false;
  }

  return (
    <div className="status-bar">
      <ul>
        <li>
          <Link to={'/'} className="reset" onClick={(e) => handleReset(e)}>
            RESET
          </Link>
        </li>
        <li>
          <Link to={'/'} className="reset" onClick={(e) => handleWipe(e)}>
            WIPE HISTORY
          </Link>
        </li>
      </ul>
      <div className="round next-manager">
        <h5>{`Round: ${currRound()}`}</h5>
        <h2>{`Current Pick: ${currManager()}`}</h2>
      </div>
      <div className="curr-manager prev-manager">
        <h5>{`Next Pick: ${nextManager()}`}</h5>
        {prevManager() && (
          <h5>
            {`Last Pick: ${prevManager().player} `}
            <span className="subtext">{`(${prevManager().pos}, ${prevManager().team})`}</span>
            {` drafted by ${prevManager().manager}`}
          </h5>
        )}
      </div>
      <div className="results">
        <ul>
          <h5>Draft Results</h5>
          {resultsState.map((player, key) => (
            <li key={key}>
              {`${player.drafted} - `}
              {`${player.overall} - `}
              <span className="subtext">{`(${player.pos}, ${player.team})`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Status;
