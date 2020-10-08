/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ReactComponent as LogoSvg } from '../../img/logo.svg';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
  },
  fullList: {
    width: 'auto',
  },
});

const Logo = () => <LogoSvg height="100px" width="200px" />;

const NavigationMobile = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: '#1c0f13' }}>
        <ListItem key="logo">
          <Logo />
        </ListItem>
      </List>
      <List style={{ backgroundColor: '#d8dbe2', height: '100%' }}>
        <Link to="/" className="reset" onClick={(e) => props.handleReset(e)}>
          <ListItem style={{ borderBottom: '1px solid #f6e8ea', padding: 15 }} button key="reset">
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: '#1c0f13',
                    fontFamily: 'Lato',
                  }}
                  variant="h6"
                >
                  Reset
                </Typography>
              }
            />
            <ArrowForwardIosIcon />
          </ListItem>
        </Link>
        <Link to="/login" className="logout" onClick={(e) => props.handleLogout(e)}>
          <ListItem style={{ borderBottom: '1px solid #f6e8ea', padding: 15 }} button key="logout">
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: '#1c0f13',
                    fontFamily: 'Lato',
                  }}
                  variant="h6"
                >
                  Logout
                </Typography>
              }
            />
            <ArrowForwardIosIcon />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  NavigationMobile.propTypes = {
    handleLogout: PropTypes.func,
    handleReset: PropTypes.func,
  };

  return (
    <div>
      <React.Fragment key="drawer">
        <MenuIcon style={{ color: 'white' }} onClick={toggleDrawer('left', true)}></MenuIcon>
        <SwipeableDrawer
          anchor={'left'}
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default NavigationMobile;
