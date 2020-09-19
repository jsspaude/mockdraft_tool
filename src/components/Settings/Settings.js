/* eslint-disable no-unused-vars */
import React, {
  useContext, useState, useEffect, useHistory,
} from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import KeeperList from '../KeeperList/KeeperList';
import Firebase from '../../calls/base';
import ManagerSelect from './ManagerSelect';
import { DataContext } from '../DataContextProvider';
import { ResultsContext } from '../ResultsContextProvider';
import { SettingsContext } from '../SettingsContextProvider';
import { AuthContext } from '../AuthContextProvider';
import CounterContextProvider from '../CounterContextProvider';
import PositionsSelect from './PositionsSelect';

const Settings = (props) => {
  const [keeperBool, setKeeperBool] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { uid, setUid } = useContext(AuthContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);

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
          state.playerData[player.index],
          keeperDrafted,
          player.index,
        );
        resultsDispatch({
          type: 'draftPlayer',
          payload: draftedData,
        });
        Firebase.updateUserData(
          uid,
          { ...state.playerData[player.index], drafted: keeperDrafted },
          `playerData/${player.index}`,
        );
      }
    });
  };

  const handleSettings = async (e) => {
    e.preventDefault();
    const rounds = await Object.values(settingsState.positions).reduce((a, b) => a + b, 0);
    settingsDispatch({ type: 'rounds', payload: rounds });
    await Firebase.updateUserData(
      uid,
      {
        ...state.userSettings,
        managers: settingsState.managers,
        rounds,
        keeperList: settingsState.keeperList,
      },
      'userSettings',
    );
    await Firebase.updateUserData(uid, true, 'inProgress');
    dispatch({ type: 'inProgress', payload: true });
    if (settingsState.keeperList) {
      draftKeepers();
    }
  };

  const handleKeeperChange = (e) => {
    setKeeperBool(e.target.checked);
  };

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
            checked={state.checkedB}
            onChange={handleKeeperChange}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>

        {keeperBool && (
          <CounterContextProvider>
            <KeeperList settingsDispatch={settingsDispatch} playerData={state.playerData} />
          </CounterContextProvider>
        )}
        <button type="submit">Start Draft</button>
      </form>
    </div>
  );
};

export default Settings;
