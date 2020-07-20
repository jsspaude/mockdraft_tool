/* eslint-disable no-unused-vars */
import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const UserSettingsContext = createContext('');

const UserSettingsContextProviders = (props) => {
  UserSettingsContextProviders.propTypes = {
    children: PropTypes.element,
  };
  const [userSettings, setUserSettings] = useState('');

  return (
    <UserSettingsContext.Provider value={[userSettings, setUserSettings]}>
      {props.children}
    </UserSettingsContext.Provider>
  );
};

export { UserSettingsContext };

export default UserSettingsContextProviders;
