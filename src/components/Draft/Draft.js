/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import PlayerList from '../PlayerList/PlayerList';
import ManagerList from '../ManagerList/ManagerList';
import Status from '../Status/Status';

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
  const history = useHistory();

  React.useEffect(() => {
    history.push(`/${uid}/draft`);
  }, [history, uid]);

  return (
    <div className="draft-room">
      <Status />
      <div className="draft-main">
        <PlayerList {...props} buttonLabel="DRAFT" />
        <ManagerList {...props} />
      </div>
    </div>
  );
};

export default Draft;
