/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';
import Firebase from '../calls/base';

const Header = (props) => {
  const [uid, setUid] = useContext(AuthContext);
  const handleLogout = () => {
    Firebase.logout();
    setUid(false);
  };
  return (
    <ul className="nav">
      {props.routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))}
      {uid && (
        <div>
          <li>
            <Link to={`/draft/${uid}`}>Draft Room</Link>
          </li>
          <li>
            <Link to={'/'} className="logout" onClick={(e) => handleLogout(e)}>
              LOGOUT
            </Link>
          </li>
        </div>
      )}
    </ul>
  );
};

export default Header;
