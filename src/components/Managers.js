// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { DataContext } from './DataContextProvider';
// import PropTypes from "prop-types";

const Managers = () => {
  const { state, dispatch, inProgress } = useContext(DataContext);
  console.log(state.userSettings.managers);
  return (
    <div className="managers">
      {Array.from(Array(state.userSettings.managers)).map((x, index) => (
        <h1 key={index}>Yay</h1>
      ))}
    </div>
  );
};

export default Managers;
