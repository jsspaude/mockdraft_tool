/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContextProvider';
import DataContextProvider, { DataContext } from './DataContextProvider';
import { UserSettingsContext } from './UserSettingsContextProviders';
import Settings from './Settings';
import Draft from './Draft';

const App = () => {
  const { state, dispatch } = useContext(DataContext);

  // HERE - had everything working now cant get data to show up in context again.
  useEffect(() => {
    dispatch({ type: 'resume' });
    console.log(state);
  }, []);

  return (
    <div className="mock-draft">
      {/* <DataContextProvider uid={uid}>
        {!userSettings.drafting && <Settings user={uid} />}
        {userSettings.drafting && <Draft user={uid} settings={userSettings} />}
      </DataContextProvider> */}
    </div>
  );
};

export default App;
