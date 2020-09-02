/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../DataContextProvider';
import Firebase from '../../calls/base';
import ManagerPositions from '../ManagerPositions/ManagerPositions';

const Manager = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { names } = state.userSettings;
  const [name, updateName] = useState(names[props.index] ? names[props.index] : '');
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
      <table className="manager-drafted-players">
        <thead>
          <tr>
            <th>POS</th>
            <th>PLAYER</th>
            <th>DRAFTED</th>
          </tr>
        </thead>
        <tbody>
          <ManagerPositions
            index={props.index}
            data={props.data}
            posStringArray={props.posStringArray}
            posSettings={props.posSettings}
            flexPosArray={props.flexPosArray}
            flexCount={props.flexCount}
            playerAssign={props.playerAssign}
          />
        </tbody>
      </table>
    </div>
  );
};

Manager.propTypes = {
  index: PropTypes.number,
  uid: PropTypes.string,
  data: PropTypes.object,
  flexPosArray: PropTypes.array,
  flexCount: PropTypes.number,
  playerAssign: PropTypes.array,
  posSettings: PropTypes.object,
  posStringArray: PropTypes.array,
};

export default Manager;
