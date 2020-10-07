/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import Firebase from '../../calls/base';
import ManagerPositions from '../ManagerPositions/ManagerPositions';
import { AuthContext } from '../../contexts/AuthContextProvider';

const Manager = (props) => {
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const { uid, setUid } = React.useContext(AuthContext);
  const [name, updateName] = React.useState('');
  const playerAssign = props.playerAssign(props.index);

  const newSettingsObject = {
    ...settingsState,
    names: {
      ...settingsState.names,
      [props.index]: name,
    },
  };

  React.useLayoutEffect(() => {
    if (settingsState.names) {
      updateName(settingsState.names[props.index] ? settingsState.names[props.index] : '');
    }
  }, [props.index, settingsState.names]);

  const handleName = (e) => {
    updateName(e);
  };

  const handleNameBlur = (e) => {
    updateName(e);
    settingsDispatch({ type: 'managerNames', payload: name, index: props.index });
    Firebase.updateUserData(uid, newSettingsObject, 'userSettings/');
  };

  return (
    <div className={`Manager${props.index}`}>
      <input
        type="text"
        name="name"
        onChange={(e) => handleName(e.target.value)}
        onBlur={(e) => handleNameBlur(e.target.value)}
        placeholder="Change Team Name"
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
            playerAssign={playerAssign}
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
  playerAssign: PropTypes.func,
  posSettings: PropTypes.object,
  posStringArray: PropTypes.array,
};

export default Manager;
