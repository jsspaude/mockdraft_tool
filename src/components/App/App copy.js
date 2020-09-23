/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Settings from '../Settings/Settings';
import { DataContext, initialState } from '../DataContextProvider';
import { AuthContext } from '../AuthContextProvider';
import '../../sass/style.scss';
import Draft from '../Draft/Draft';
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

const App = (props) => {
  const { uid, setUid } = useContext(AuthContext);
  const { state, dispatch } = useContext(DataContext);
  const [pending, setPending] = useState(true);
  const history = useHistory();

  console.log(state);

  useEffect(() => {
    history.push({ pathname: `/${uid}` });
    if (state.inProgress) {
      setPending(false);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    const resultsObject = { playerData: state.playerData, posData: state.userSettings.positions };
    await Firebase.updateResultsData(uid, resultsObject, id).then(() => Firebase.removeData(uid, '/data').then(() => {
      createCsvObject(uid).then((data) => {
        Firebase.setUserData(uid, { ...initialState, playerData: data }, 'data');
      });
    }));
  };

  const handleWipe = async (e) => {
    e.preventDefault();
    Firebase.removeData(uid, '/results');
  };

  if (state.inProgress) {
    return (
      <div className="App">
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

        <Draft {...props} />
      </div>
    );
  }
  return (
    <div className="App">
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
      <Settings {...props} />
    </div>
  );
};

App.propTypes = {
  uid: PropTypes.string,
};

export default App;
