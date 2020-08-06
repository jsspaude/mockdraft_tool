/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { DataContext } from './DataContextProvider';
import Manager from './Manager';
// import PropTypes from "prop-types";

const ManagersList = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { positions } = state.userSettings;

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

  const posArray = Object.keys(state.userSettings.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => ({ [pos]: positions[pos] }));

  console.log(posArray);

  // HERE!!!!!

  return (
    <div className="managers">
      {Array.from(Array(state.userSettings.managers)).map((x, key) => (
        <Manager
          data={state}
          posArray={posArray}
          index={key}
          key={key}
          uid={props.uid}
          index={key}
        />
      ))}
    </div>
  );
};

export default ManagersList;
