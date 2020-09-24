/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Firebase from '../../calls/base';

const Header = () => {
  const { uid, setUid } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = () => {
    Firebase.logout();
    setUid({ type: 'loggedOut', payload: false });
    history.push({
      pathname: '/login',
    });
  };
  return (
    <ul className="nav">
      <li key="/signup">
        <Link to="/signup">SignUp</Link>
      </li>
      <li key="/">
        <Link to="/">Login</Link>
      </li>
      {uid && (
        <>
          <li>
            <Link to={`${uid}`}>Draft Room</Link>
          </li>
          <li>
            <Link to="/login" className="logout" onClick={(e) => handleLogout(e)}>
              LOGOUT
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Header;
