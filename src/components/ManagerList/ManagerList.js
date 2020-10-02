/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataContext } from '../../contexts/DataContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Manager from '../Manager/Manager';
import { flattenObject } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const roundingHelper = (x, key) => {
  const y = x[key];
  return Math.round((y - Math.round(y)) * 100);
};

const ManagerList = (props) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const { resultsState, resultsDispatch } = useContext(ResultsContext);
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { uid, setUid } = useContext(AuthContext);
  const { positions } = settingsState;
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleManagerChange = (x) => {
    setValue(x);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const playerAssign = (i) => {
    if (resultsState && resultsState.length) {
      return resultsState
        .map((p) => (roundingHelper(p, 'drafted') === i ? p : null))
        .filter((item) => item != null);
    }
    return [];
  };

  const handleName = (key) => {
    if (settingsState.names[key]) {
      return `${settingsState.names[key]}`;
    }
    return `Manager-${key}`;
  };

  const posOrder = [
    'QB',
    'RB',
    'WR',
    'TE',
    'QB_WR_RB_TE',
    'WR_RB_TE',
    'WR_RB',
    'WR_TE',
    'RB_TE',
    'K',
    'DST',
    'BENCH',
  ];

  const posSettings = flattenObject({
    ...Object.keys(settingsState.positions)
      .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
      .map((pos) => ({ [pos]: positions[pos] })),
  });
  const posStringArray = Object.keys(settingsState.positions)
    .sort((a, b) => posOrder.indexOf(a) - posOrder.indexOf(b))
    .map((pos) => Array(positions[pos])
      .fill(pos)
      .map((item, i) => `${item}${i}`))
    .flat();
  const flexSettings = Object.keys(posSettings)
    .map((key) => (key.includes('_') ? key : undefined))
    .map((flex) => (posSettings[flex] > 0 ? { [flex]: posSettings[flex] } : undefined))
    .filter((item) => item !== undefined);
  const flexPosArray = Object.keys(...flexSettings)
    .map((key) => key.split('_'))
    .flat();
  const flexCount = Object.values(...flexSettings).reduce((a, b) => a + b);

  const managerControl = () => (
    <Manager
      key={value}
      uid={uid}
      index={value}
      data={dataState}
      posStringArray={posStringArray}
      posSettings={posSettings}
      flexPosArray={flexPosArray}
      flexCount={flexCount}
      playerAssign={playerAssign}
    />
  );

  return (
    <div className="manager-list">
      <div className={classes.root}>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          {handleName(value)}
          <ExpandMoreIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {Array.from(Array(settingsState.managers)).map((x, key) => (
            <MenuItem key={key} value={key} onClick={() => handleManagerChange(key)}>
              {handleName(key)}
            </MenuItem>
          ))}
        </Menu>
        <div>{managerControl()}</div>
      </div>
    </div>
  );
};

export default ManagerList;
