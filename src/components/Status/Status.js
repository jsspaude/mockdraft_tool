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
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  const history = useHistory();
  const posStripped = (position) => position.replace(/[0-9]/g, '');

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
      const resultsArray = () => {
        if (resultsState.length > 1) {
          return resultsState[resultsState.length - 1];
        }
        return resultsState[0];
      };
      console.log(resultsArray);
      const status = resultsArray().drafted;
      const player = resultsArray().overall;
      const pos = posStripped(resultsArray().pos);
      const { team } = resultsArray();
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
