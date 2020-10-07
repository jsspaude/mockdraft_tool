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
  const currPick = () => Math.trunc(counterState.currPick);

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
      <div className="status status-1 no-margin">
        <div>
          <h6 className="underline">Round</h6>
          <h5>{currRound()}</h5>
        </div>
        <div>
          <h6 className="underline">Pick</h6>
          <h5>{currPick()}</h5>
        </div>
      </div>
      <div className="status no-margin ">
        {prevManager() && (
          <>
            <h6 className="underline">{`${prevManager().manager} drafted:`}</h6>
            <h5>
              {prevManager().player}{' '}
              <span className="subtext">{`(${prevManager().pos}, ${prevManager().team})`}</span>
            </h5>
          </>
        )}
      </div>
      <div className="status no-margin ">
        <h6 className="underline">On The Clock:</h6>
        <h4>{currManager()}</h4>
      </div>
      <div className="status no-margin">
        <h6 className="underline">Next:</h6>
        <h5>{nextManager()}</h5>
      </div>
    </div>
  );
};

export default Status;
