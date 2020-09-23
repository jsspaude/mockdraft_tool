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

export default function PositionsSelect() {
  const classes = useStyles();
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);

  const handlePositionsChange = (e, label) => {
    const payload = parseInt(e, 10);
    settingsDispatch({ type: 'positions', label, payload });
  };

  return (
    <div id="positions-select">
      <FormControl className={classes.formControl}>
        <InputLabel id="qb-select">QB</InputLabel>
        <Select
          labelId="qb-select"
          id="select-qb"
          defaultValue={1}
          onChange={(e) => handlePositionsChange(e.target.value, 'QB')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="rb-select">RB</InputLabel>
        <Select
          labelId="rb-select"
          id="select-rb"
          defaultValue={2}
          onChange={(e) => handlePositionsChange(e.target.value, 'RB')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="wr-select">WR</InputLabel>
        <Select
          labelId="wr-select"
          id="select-wr"
          defaultValue={2}
          onChange={(e) => handlePositionsChange(e.target.value, 'WR')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="te-select">TE</InputLabel>
        <Select
          labelId="te-select"
          id="select-te"
          defaultValue={1}
          onChange={(e) => handlePositionsChange(e.target.value, 'TE')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="wr-rb-select">WR/RB</InputLabel>
        <Select
          labelId="wr-rb-select"
          id="select-wr-rb"
          defaultValue={0}
          onChange={(e) => handlePositionsChange(e.target.value, 'WR_RB')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="wr-te-select">WR/TE</InputLabel>
        <Select
          labelId="wr-te-select"
          id="select-wr-te"
          defaultValue={0}
          onChange={(e) => handlePositionsChange(e.target.value, 'WR_TE')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="rb-te-select">RB/TE</InputLabel>
        <Select
          labelId="rb-te-select"
          id="select-rb-te"
          defaultValue={0}
          onChange={(e) => handlePositionsChange(e.target.value, 'RB_TE')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="wr-rb-te-select">WR/RB/TE</InputLabel>
        <Select
          labelId="wr-rb-te-select"
          id="select-wr-rb-te"
          defaultValue={2}
          onChange={(e) => handlePositionsChange(e.target.value, 'WR_RB_TE')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="qb-wr-rb-te-select">QB/WR/RB/TE</InputLabel>
        <Select
          labelId="qb-wr-rb-te-select"
          id="select-qb-wr-rb-te"
          defaultValue={0}
          onChange={(e) => handlePositionsChange(e.target.value, 'QB_WR_RB_TE')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="dst-select">DST</InputLabel>
        <Select
          labelId="dst-select"
          id="select-dst"
          defaultValue={1}
          onChange={(e) => handlePositionsChange(e.target.value, 'DST')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="k-select">K</InputLabel>
        <Select
          labelId="k-select"
          id="select-k"
          defaultValue={1}
          onChange={(e) => handlePositionsChange(e.target.value, 'K')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="bench-select">BENCH</InputLabel>
        <Select
          labelId="bench-select"
          id="select-bench"
          defaultValue={5}
          onChange={(e) => handlePositionsChange(e.target.value, 'BENCH')}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
