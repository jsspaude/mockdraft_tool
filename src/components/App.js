/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Settings from './Settings';
import { DataContext } from './DataContextProvider';
import { createCsvObject } from '../calls/csvData';
import Firebase from '../calls/base';
import Draft from './Draft';

const App = (props) => {
  const { state, dispatch, inProgress } = useContext(DataContext);

  return (
    <div className="mock-draft">
      {!inProgress && <Settings {...props} />}
      {inProgress && <Draft {...props} />}
    </div>
  );
};

export default App;
