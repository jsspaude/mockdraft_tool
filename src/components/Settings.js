/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { DataContext } from './DataContextProvider';
import { UserSettingsContext } from './UserSettingsContextProviders';

const Settings = (props) => {
  const [userSettings, setUserSettings] = useContext(UserSettingsContext);
  const [managers, setManagers] = useState(10);
  const [rounds, setRounds] = useState('');
  const settingsObj = { managers, rounds, drafting: true };
  const handleSettings = async (e) => {
    e.preventDefault();
    await setUserSettings(settingsObj);
    console.log(settingsObj);
    Firebase.updateUserData(props.user, settingsObj, 'userSettings');
  };

  return (
    <div>
      <form className="user-settings" onSubmit={(e) => handleSettings(e)}>
        <input
          type="text"
          name="rounds"
          onChange={(e) => setRounds(parseInt(e.target.value, 10))}
          placeholder="# of Rounds"
          required
        />
        <select defaultValue="10" onChange={(e) => setManagers(parseInt(e.target.value, 10))}>
          <option value="10">10 Managers</option>
          <option value="4">4 Managers</option>
          <option value="12">12 Managers</option>
          <option value="14">14 Managers</option>
          <option value="16">16 Managers</option>
        </select>
        <button type="submit">Start Draft</button>
      </form>
    </div>
  );
};

export default Settings;
