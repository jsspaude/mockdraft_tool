/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { AuthContext } from './AuthContextProvider';
import { DataContext } from './DataContextProvider';
import { UserSettingsContext } from './UserSettingsContextProviders';
import getCsvData from '../calls/GetCSV';
import { slugify } from '../helpers';
import Settings from './Settings';
import Draft from './Draft';

const App = (props) => {
  const [uid, setUid] = useContext(AuthContext);
  const [playerData, setPlayerData] = useContext(DataContext);
  const [userSettings, setUserSettings] = useContext(UserSettingsContext);
  const dataRef = Firebase.dataRef(uid);

  const collectData = () => dataRef.once('value').then((snapshot) => {
    const settings = (snapshot.val() && snapshot.val().userSettings) || '';
    const players = (snapshot.val() && snapshot.val().playerData) || '';
    return { settings, players };
  });

  const reducePlayerObject = (data, action) => {
    const arr = data;
    const playerObject = arr.reduce(
      (obj, item) => ({
        ...obj,
        [slugify(item.overall)]: item,
      }),
      {},
    );
    console.log(playerObject);
    return playerObject;
  };

  useLayoutEffect(() => {
    collectData().then((res) => {
      if (!res.settings) {
        getCsvData()
          .then((result) => reducePlayerObject(result.data))
          .then((obj) => {
            setPlayerData(obj);
            Firebase.setUserData(uid, obj, 'playerData');
          });
      } else {
        setPlayerData(res.players);
        setUserSettings(res.settings);
      }
    });
  }, []);

  return (
    <div className="mock-draft">
      {!userSettings.drafting && <Settings user={uid} />}
      {userSettings.drafting && <Draft user={uid} data={playerData} settings={userSettings} />}
    </div>
  );
};

export default App;
