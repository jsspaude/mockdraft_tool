/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { DataContext } from './DataContextProvider';
import '../css/style.css';
import Draft from './Draft';
import Firebase from '../calls/base';

const App = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [inProgress, setInProgress] = useState(false);
  const handleReset = async (e) => {
    await dispatch({ type: 'reset' });
    Firebase.removeData(props.uid, 'data');
  };

  useEffect(() => {
    if (state) {
      setInProgress(state.inProgress);
    }
  }, [state]);

  return (
    <div className="mock-draft">
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

export default App;
