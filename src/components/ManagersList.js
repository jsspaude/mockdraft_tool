/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { DataContext } from './DataContextProvider';
import Manager from './Manager';
// import PropTypes from "prop-types";

const ManagersList = (props) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="managers">
      {Array.from(Array(state.userSettings.managers)).map((x, key) => (
        <Manager key={key} uid={props.uid} index={key} />
      ))}
    </div>
  );
};

export default ManagersList;
