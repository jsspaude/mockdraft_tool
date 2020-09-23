/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import KeeperList from '../KeeperList/KeeperList';
import Firebase from '../../calls/base';
import ManagerSelect from './ManagerSelect';
import { DataContext } from '../../contexts/DataContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import CounterContextProvider from '../../contexts/CounterContextProvider';
import PositionsSelect from './PositionsSelect';
import { FirebaseContext } from '../../contexts/FirebaseContextProvider';

const Settings = (props) => {
  const [keeperBool, setKeeperBool] = useState(false);
  const { dataState, dataDispatch } = useContext(DataContext);
  const { uid, setUid } = useContext(AuthContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { firebaseState, firebaseDispatch } = React.useContext(FirebaseContext);
  const history = useHistory();

  const updateDraftedStatus = (player, status, index) => {
    const change = player;
    change.drafted = status;
    change.index = index;
    return change;
  };

  const draftKeepers = async () => {
    await settingsState.keeperList.forEach((player) => {
      if (player.round && player.manager) {
        const round = parseInt(player.round, 10);
        const manager = (parseInt(player.manager, 10) - 1) * 0.01;
        const keeperDrafted = round + manager;
        const draftedData = updateDraftedStatus(
          dataState.playerData[player.index],
          keeperDrafted,
          player.index,
        );
        resultsDispatch({
          type: 'draftPlayer',
          payload: draftedData,
        });
        Firebase.updateUserData(
          uid,
          { ...dataState.playerData[player.index], drafted: keeperDrafted },
          `playerData/${player.index}`,
        );
      }
    });
  };

  const handleSettings = async (e) => {
    e.preventDefault();
    if (settingsState.keeperList) {
      draftKeepers();
    }
    const rounds = Object.values(settingsState.positions).reduce((a, b) => a + b, 0);
    dataDispatch({ type: 'inProgress', payload: true });
    settingsDispatch({ type: 'rounds', payload: rounds });
    firebaseDispatch({ type: 'initialize', payload: { ...settingsState, ...dataState } });
    Firebase.updateUserData(uid, {
      ...dataState,
      inProgress: true,
      userSettings: {
        managers: settingsState.managers,
        rounds,
        positions: settingsState.positions,
        keeperList: settingsState.keeperList,
        counter: settingsState.counter,
      },
    });
    history.push('/');
  };

  const handleKeeperChange = (e) => {
    setKeeperBool(e.target.checked);
  };

  useEffect(() => {
    if (dataState.inProgress) {
      history.push(`/${uid}/draft`);
    }
  }, []);

  useEffect(() => {}, [settingsState.keeperBool]);
  return (
    <div>
      <form className="user-settings" onSubmit={(e) => handleSettings(e)}>
        <ManagerSelect />
        <h2>POSITIONS</h2>
        <PositionsSelect />
        <div>
          <h3>Set Keepers?</h3>
          <Switch
            checked={dataState.checkedB}
            onChange={handleKeeperChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>

        {keeperBool && (
          <CounterContextProvider>
            <KeeperList settingsDispatch={settingsDispatch} playerData={dataState.playerData} />
          </CounterContextProvider>
        )}
        <button type="submit">Start Draft</button>
      </form>
    </div>
  );
};

export default Settings;
