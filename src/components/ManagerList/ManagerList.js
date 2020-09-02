/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../DataContextProvider';
import Manager from '../Manager/Manager';
import { flattenObject } from '../../helpers';

const roundingHelper = (x, key) => {
  const y = x[key];
  return Math.round((y - Math.round(y)) * 100);
};

const ManagerList = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { positions } = state.userSettings;
  const playerAssign = (i) => props.draftedPlayers
    .map((p) => (roundingHelper(p, 'drafted') === i ? p : null))
    .filter((item) => item != null);

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
    ...Object.keys(positions)
      .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
      .map((pos) => ({ [pos]: positions[pos] })),
  });
  const posStringArray = Object.keys(positions)
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
      {Array.from(Array(state.userSettings.managers)).map((x, key) => (
        <Manager
          key={key}
          uid={props.uid}
          index={key}
          data={state}
          posStringArray={posStringArray}
          posSettings={posSettings}
          flexPosArray={flexPosArray}
          flexCount={flexCount}
          playerAssign={playerAssign(key)}
        />
      ))}
    </div>
  );
};

ManagerList.propTypes = {
  uid: PropTypes.string,
  data: PropTypes.object,
  draftedPlayers: PropTypes.array,
};

export default ManagerList;
