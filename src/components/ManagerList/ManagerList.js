/* eslint-disable no-unused-vars */
import React, { useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../../contexts/DataContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import Manager from '../Manager/Manager';
import { flattenObject } from '../../helpers';

const roundingHelper = (x, key) => {
  const y = x[key];
  return Math.round((y - Math.round(y)) * 100);
};

const ManagerList = (props) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { positions } = settingsState;
  const playerAssign = (i) => {
    if (resultsState && resultsState.length) {
      return resultsState
        .map((p) => (roundingHelper(p, 'drafted') === i ? p : null))
        .filter((item) => item != null);
    }
    return [];
  };

  const posOrder = [
    'QB',
    'RB',
    'WR',
    'TE',
    'QB_WR_RB_TE',
    'WR_RB_TE',
    'WR_RB',
    'WR_TE',
    'RB_TE',
    'K',
    'DST',
    'BENCH',
  ];

  const posSettings = flattenObject({
    ...Object.keys(settingsState.positions)
      .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
      .map((pos) => ({ [pos]: positions[pos] })),
  });
  const posStringArray = Object.keys(settingsState.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => Array(positions[pos])
      .fill(pos)
      .map((item, i) => `${item}${i}`))
    .flat();
  const flexSettings = Object.keys(posSettings)
    .map((key) => (key.includes('_') ? key : undefined))
    .map((flex) => (posSettings[flex] > 0 ? { [flex]: posSettings[flex] } : undefined))
    .filter((item) => item !== undefined);
  const flexPosArray = Object.keys(...flexSettings)
    .map((key) => key.split('_'))
    .flat();
  const flexCount = Object.values(...flexSettings).reduce((a, b) => a + b);

  return (
    <div className="manager-list">
      {Array.from(Array(settingsState.managers)).map((x, key) => (
        <Manager
          key={key}
          uid={props.uid}
          index={key}
          data={dataState}
          posStringArray={posStringArray}
          posSettings={posSettings}
          flexPosArray={flexPosArray}
          flexCount={flexCount}
          playerAssign={playerAssign}
        />
      ))}
    </div>
  );
};

ManagerList.propTypes = {
  uid: PropTypes.string,
  data: PropTypes.object,
  draftedPlayers: PropTypes.any,
};

export default ManagerList;
