/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataContext } from '../contexts/DataContextProvider';

export default function ComboBox() {
  const { dataState, dataDispatch } = React.useContext(DataContext);
  return (
    <Autocomplete
      id="combo-box-demo"
      options={[...Object.values(dataState.playerData)]}
      getOptionLabel={(option) => option.overall}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}
