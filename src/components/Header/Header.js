/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Default, Mobile } from '../MediaQuery';
import NavigationMobile from '../Navigation/NavigationMobile';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import { ReactComponent as LogoSvg } from '../../img/logo.svg';
import Firebase from '../../calls/base';
import { createCsvObject } from '../../calls/csvData';
import { id } from '../../helpers';

const Logo = () => <LogoSvg height="100px" width="200px" />;

const Header = () => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const history = useHistory();
  const handleLogout = () => {
    Firebase.logout();
    setUid({ type: 'loggedOut', payload: false });
    history.push({
      pathname: '/login',
    });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const resultsObject = { playerData: dataState.playerData, posData: settingsState.positions };
    await Firebase.updateResultsData(uid, resultsObject, id).then(() => Firebase.removeData(uid, '/data').then(() => {
      createCsvObject(uid).then((data) => {
        Firebase.setUserData(uid, { playerData: data }, 'data');
        dataDispatch({ type: 'reset', payload: data });
        settingsDispatch({ type: 'reset' });
      });
      history.push('/');
    }));
  };

  const handleWipe = async (e) => {
    e.preventDefault();
    Firebase.removeData(uid, '/results');
  };
  return (
    <div className="header">
      <Mobile>
        <div className="header-bar header-mobile">
          <div className="header-top">
            <div>
              <Logo />
            </div>
            {uid && (
              <div className="navigation-mobile">
                <NavigationMobile />
              </div>
            )}
          </div>
        </div>
      </Mobile>
      <Default>
        <div className="header-bar">
          <div className="header-top">
            <div>
              <Logo />
            </div>
            {uid && (
              <div className="navigation">
                <Link to={'/'} className="reset" onClick={(e) => handleReset(e)}>
                  RESET
                </Link>
                <Link to={'/'} className="reset" onClick={(e) => handleWipe(e)}>
                  WIPE HISTORY
                </Link>
                <Link to="/login" className="logout" onClick={(e) => handleLogout(e)}>
                  LOGOUT
                </Link>
              </div>
            )}
          </div>
          <div className="header-bottom"></div>
        </div>
      </Default>
    </div>
  );
};

export default Header;
