/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';
import Navigation from '../Navigation/NavigationMobile';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ReactComponent as LogoSvg } from '../../img/logo.svg';
import Firebase from '../../calls/base';
import { DataContext } from '../../contexts/DataContextProvider';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const Logo = () => <LogoSvg height="100px" width="200px" />;

const Header = () => {
  const { uid, setUid } = useContext(AuthContext);
  const { dataState, dataDispatch } = useContext(DataContext);
  const history = useHistory();
  const handleLogout = () => {
    Firebase.logout();
    setUid({ type: 'loggedOut', payload: false });
    history.push({
      pathname: '/login',
    });
  };
  return (
    <div className="header">
      <Mobile>
        <div className="header-bar header-mobile">
          <div className="header-top">
            <div>
              <Logo />
            </div>
            <div className="navigation-mobile">
              <Navigation />
            </div>
          </div>
          <div className="header-bottom">
            <div>
              <h1>MOCK DRAFT TOOL</h1>
            </div>
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="header-bar">
          <div className="header-top">
            <div>
              <Logo />
            </div>
            <div className="navigation">
              {!uid && (
                <>
                  <Link to="/login">LOGIN</Link>
                  <Link to="/signup">SIGNUP</Link>
                </>
              )}
              {uid && (
                <>
                  <Link to={`${uid}`}>Draft Room</Link>
                  <Link to="/login" className="logout" onClick={(e) => handleLogout(e)}>
                    LOGOUT
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="header-bottom"></div>
        </div>
      </Default>
    </div>
  );
};

export default Header;
