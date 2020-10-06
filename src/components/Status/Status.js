/* eslint-disable no-unused-vars */
import React from 'react';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { counter, id } from '../../helpers';

const Status = () => {
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
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
    <div className="status-info">
      <div className="round next-manager">
        <h5 className="no-margin underline">Round</h5>
        <h5>{currRound()}</h5>
        <h5 className="no-margin underline">On The Clock:</h5>
        <h2>{currManager()}</h2>
      </div>
      <div className="curr-manager prev-manager">
        <h5 className="no-margin underline">Next:</h5>
        <h5>{nextManager()}</h5>
        {prevManager() && (
          <>
            <h5 className="no-margin underline">Previous:</h5>
            <h5 className="subtext">{prevManager().manager}</h5>
            <h5 className="no-margin">
              {prevManager().player}{' '}
              <span className="subtext">{`(${prevManager().pos}, ${prevManager().team})`}</span>
            </h5>
          </>
        )}
      </div>
    </div>
  );
};

export default Status;
