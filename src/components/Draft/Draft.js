/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import PlayerList from '../PlayerList/PlayerList';
import ManagerList from '../ManagerList/ManagerList';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import CounterContextProvider from '../../contexts/CounterContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import Firebase from '../../calls/base';
import { createCsvObject } from '../../calls/csvData';

const date = new Date();
const components = [
  date.getYear(),
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
  date.getMilliseconds(),
];
const id = components.join('');

const Draft = (props) => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const history = useHistory();

  const handleReset = async (e) => {
    e.preventDefault();
    const resultsObject = { playerData: dataState.playerData, posData: settingsState.positions };
    await Firebase.updateResultsData(uid, resultsObject, id).then(() => Firebase.removeData(uid, '/data').then(() => {
      createCsvObject(uid).then((data) => {
        Firebase.setUserData(uid, { playerData: data }, 'data');
        dataDispatch({ type: 'reset', payload: data });
        settingsDispatch({ type: 'reset' });
      });
      history.push('/');
    }));
  };

  const handleWipe = async (e) => {
    e.preventDefault();
    Firebase.removeData(uid, '/results');
  };

  React.useEffect(() => {
    history.push(`/${uid}/draft`);
  }, [history, uid]);

  return (
    <div className="draft-main">
      <ul>
        <li>
          <Link to={'/'} className="reset" onClick={(e) => handleReset(e)}>
            RESET
          </Link>
        </li>
        <li>
          <Link to={'/'} className="reset" onClick={(e) => handleWipe(e)}>
            WIPE HISTORY
          </Link>
        </li>
      </ul>
      <CounterContextProvider userSettings={settingsState}>
        <PlayerList {...props} buttonLabel="DRAFT" />
      </CounterContextProvider>
      <ManagerList {...props} />
    </div>
  );
};

export default Draft;
