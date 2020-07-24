/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Settings from './Settings';
import { DataContext } from './DataContextProvider';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';
import Draft from './Draft';

const App = (props) => {
  const [initialData, setInitialData] = useState(null);
  const { state, dispatch } = useContext(DataContext);
  useEffect(() => {
    async function initData() {
      const response = await Firebase.collectData(props.uid);
      dispatch({ type: 'loadSettings', payload: response });
      if (!response) {
        createCsvObject(props.uid).then((data) => {
          dispatch({ type: 'loadSettings', payload: data });
        });
      }
    }
    initData();
  }, []);

  return (
    <div className="mock-draft">
      <Settings {...props} />
      {/* {userSettings.drafting && <Draft user={uid} settings={userSettings} />} */}
    </div>
  );
};

export default App;
