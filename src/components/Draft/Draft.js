/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory } from 'react-router-dom';
import PlayerList from '../PlayerList/PlayerList';
import ManagerList from '../ManagerList/ManagerList';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import CounterContextProvider from '../../contexts/CounterContextProvider';

const Draft = (props) => {
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);

  return (
    <div className="draft-main">
      <CounterContextProvider userSettings={settingsState}>
        <PlayerList {...props} buttonLabel="DRAFT" />
      </CounterContextProvider>
      <ManagerList {...props} />
    </div>
  );
};

export default Draft;
