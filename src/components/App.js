/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { DataContext, initialState } from './DataContextProvider';
import '../css/style.css';
import Draft from './Draft';
import Firebase from '../calls/base';
import { createCsvObject } from '../calls/csvData';

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

const App = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [inProgress, setInProgress] = useState(false);
  const handleReset = (e) => {
    const resultsObject = { playerData: state.playerData, posData: state.userSettings.positions };
    Firebase.updateResultsData(props.uid, resultsObject, id).then(() => Firebase.removeData(props.uid, '/data').then(() => {
      createCsvObject(props.uid).then((data) => {
        Firebase.setUserData(props.uid, { ...initialState, playerData: data }, 'data');
      });
    }));
  };
  useEffect(() => {
    if (state) {
      setInProgress(state.inProgress);
    }
  }, [state]);
  return (
    <div className="App">
      <ul>
        <li>
          <Link to={'/'} className="reset" onClick={(e) => handleReset(e)}>
            RESET
          </Link>
        </li>
      </ul>
      {!inProgress && <Settings {...props} />}
      {inProgress && <Draft {...props} />}
    </div>
  );
};

App.propTypes = {
  uid: PropTypes.string,
};

export default App;
