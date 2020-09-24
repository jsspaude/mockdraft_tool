/* eslint-disable no-unused-vars */
import React from 'react';
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
  const [keeperBool, setKeeperBool] = React.useState(false);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { uid, setUid } = React.useContext(AuthContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const { firebaseState, firebaseDispatch } = React.useContext(FirebaseContext);
  const history = useHistory();

  React.useEffect(() => {
    if (dataState.inProgress) {
      history.push(`/${uid}/draft`);
    }
  }, [dataState.inProgress, history, uid]);

  React.useEffect(() => {}, [settingsState.keeperBool]);

  const updateDraftedStatus = (player, status, index) => {
    const change = player;
    change.drafted = status;
    change.index = index;
    return change;
  };

  const draftKeepers = async () => {
    const keeperPicksArray = [];
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
        keeperPicksArray.push(draftedData.drafted);
        Firebase.updateUserData(
          uid,
          { ...dataState.playerData[player.index], drafted: keeperDrafted },
          `playerData/${player.index}`,
        );
      }
    });
    return keeperPicksArray;
  };

  const handleSettings = async (e) => {
    e.preventDefault();
    const updateContexts = (res) => {
      const keepers = res || false;
      const rounds = Object.values(settingsState.positions).reduce((a, b) => a + b, 0);
      dataDispatch({ type: 'inProgress', payload: true });
      settingsDispatch({ type: 'rounds', payload: rounds });
      settingsDispatch({ type: 'keeperPicks', payload: keepers });
      Firebase.updateUserData(uid, {
        ...dataState,
        inProgress: true,
        userSettings: {
          managers: settingsState.managers,
          rounds,
          positions: settingsState.positions,
          keeperList: settingsState.keeperList,
          counter: {
            ...settingsState.counter,
            keeperPicks: keepers,
          },
          names: settingsState.names,
        },
      });
    };
    if (settingsState.keeperList) {
      return draftKeepers().then((res) => updateContexts(res));
    }
    return updateContexts();
  };

  const handleKeeperChange = (e) => {
    setKeeperBool(e.target.checked);
  };

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
