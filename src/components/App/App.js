/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Router from '../Router';
import DataContextProvider from '../../contexts/DataContextProvider';
import SettingsContextProvider from '../../contexts/SettingsContextProvider';
import '../../sass/style.scss';
import FirebaseContextProvider from '../../contexts/FirebaseContextProvider';

const App = (props) => (
  <div className="App">
    <FirebaseContextProvider>
      <DataContextProvider>
        <SettingsContextProvider>
          <Router {...props} />
        </SettingsContextProvider>
      </DataContextProvider>
    </FirebaseContextProvider>
  </div>
);

export default App;
