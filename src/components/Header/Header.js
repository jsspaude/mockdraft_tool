/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ReactComponent as LogoSvg } from '../../img/logo.svg';
import Firebase from '../../calls/base';

const Logo = () => <LogoSvg height="100px" width="200px" />;

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
  return (
    <div className="header">
      <div>
        <Logo />
      </div>
      <div>
        <h1>MOCK DRAFT TOOL</h1>
      </div>
      <div>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
