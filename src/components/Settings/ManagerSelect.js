/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SettingsContext } from '../../contexts/SettingsContextProvider';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ManagerSelect() {
  const classes = useStyles();
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);

  const handleManagerChange = (e) => {
    settingsDispatch({ type: 'managers', payload: parseInt(e, 10) });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="managers-select"># Managers</InputLabel>
        <Select
          labelId="managers-select"
          id="select-managers"
          defaultValue={10}
          onChange={(e) => handleManagerChange(e.target.value)}
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
