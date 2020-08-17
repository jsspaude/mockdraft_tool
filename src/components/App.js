/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Settings from './Settings';
import { DataContext } from './DataContextProvider';
import '../css/style.css';
import Draft from './Draft';
import Firebase from '../calls/base';

const App = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const [inProgress, setInProgress] = useState(false);
  const handleReset = (e) => {
    Firebase.moveRecord(`${props.uid}/data`, `${props.uid}/olddata`).then(() => Firebase.setUserData(props.uid, state, 'data'));
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
      {inProgress && <Draft data={state} {...props} />}
    </div>
  );
};

export default App;
