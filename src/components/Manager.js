/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { DataContext } from './DataContextProvider';
import Firebase from '../calls/base';
import ManagerPositions from './ManagerPositions';

const Manager = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [name, updateName] = useState(
    state.userSettings.names[props.index] ? state.userSettings.names[props.index] : '',
  );
  const newSettingsObject = {
    ...state.userSettings,
    names: {
      ...state.userSettings.names,
      [props.index]: name,
    },
  };

  const handleName = (e) => {
    updateName(e);
  };

  const handleNameBlur = (e) => {
    updateName(e);
    dispatch({ type: 'managerNames', payload: name, index: props.index });
    Firebase.updateUserData(props.uid, newSettingsObject, 'userSettings/');
  };

  return (
    <div className={`Manager${props.index}`}>
      <input
        type="text"
        name="name"
        onChange={(e) => handleName(e.target.value)}
        onBlur={(e) => handleNameBlur(e.target.value)}
        placeholder={(name && name) || (!name && `Manager-${props.index}`)}
        value={name && `${name}`}
      />
      <table className="players">
        <thead>
          <tr>
            <th>POS</th>
            <th>NAME</th>
            <th>TEAM</th>
            <th>ROUND</th>
          </tr>
          {props.posArray.map((x, key) => (
            <ManagerPositions key={key} index={key} posArray={props.posArray} />
          ))}
        </thead>
      </table>
    </div>
  );
};

export default Manager;
