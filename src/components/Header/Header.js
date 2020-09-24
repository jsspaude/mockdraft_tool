/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Firebase from '../../calls/base';

const Header = () => {
  const { uid, setUid } = useContext(AuthContext);
  // const history = useHistory();
  // const handleLogout = () => {
  //   Firebase.logout();
  //   setUid({ type: 'loggedOut', payload: false });
  //   history.push({
  //     pathname: '/login',
  //   });
  // };
  return <Navigation />;
};

export default Header;
