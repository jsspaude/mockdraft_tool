/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { DataContext } from './DataContextProvider';
import Manager from './Manager';
// import PropTypes from "prop-types";

const ManagersList = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { positions } = state.userSettings;
  const { draftedPlayers } = props;

  const playerAssign = (i) => draftedPlayers
    .map((player) => {
      const { drafted } = player;
      const managerIndex = (drafted - Math.trunc(drafted)) * 100;
      if (Math.trunc(managerIndex) === i) {
        return player;
      }
      return null;
    })
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

  const posObjArray = Object.keys(state.userSettings.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => ({ [pos]: positions[pos] }));

  const posStringArray = Object.keys(state.userSettings.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => {
      const arr = Array(positions[pos]).fill(pos);
      const newArr = arr.map((item, i) => `${item}${i}`);
      return newArr;
    })
    .flat();

  return (
    <div className="managers">
      {Array.from(Array(state.userSettings.managers)).map((x, key) => (
        <Manager
          key={key}
          uid={props.uid}
          index={key}
          data={state}
          posObjArray={posObjArray}
          posStringArray={posStringArray}
          playerAssign={playerAssign(key)}
        />
      ))}
    </div>
  );
};

export default ManagersList;
