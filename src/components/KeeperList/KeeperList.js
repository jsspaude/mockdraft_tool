/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PlayerTable from '../PlayerTable/PlayerTable';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';

const KeeperList = (props) => {
  const [keepers, setKeepers] = useState('');
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
  const { dataState, dataDispatch } = useContext(DataContext);
  const { playerData } = props;

  const handleKeeper = (info) => {
    setKeepers([...keepers, { index: info.index }]);
    settingsDispatch({ type: 'keeperList', payload: [...keepers, { index: info.index }] });
  };
  const handleKeeperInput = (e, label, playerIndex) => {
    const newKeepers = keepers.map((keeper) => {
      if (keeper.index === playerIndex) {
        return { ...keeper, [label]: parseInt(e, 10) };
      }
      return keeper;
    });
    setKeepers(newKeepers);
    settingsDispatch({ type: 'keeperList', payload: newKeepers });
  };

  return (
    <div className="keeper-list-container">
      <Grid container spacing={3}>
        <Grid className="player-table" item md={4} sm={12}>
          <PlayerTable
            {...props}
            getRowProps={(row) => ({
              style: {
                display: row.original.drafted ? 'none' : '',
              },
            })}
            keepers={keepers}
            handleKeeper={handleKeeper}
            buttonLabel="KEEP"
          />
        </Grid>
        <Grid className="keeper-player-spacer" item md={2} sm={false}></Grid>
        <Grid className="keeper-player-info" item md={4} sm={12}>
          {keepers
            && keepers.map((key, i) => (
              <div key={i} index={key.index} className="keeper-player-input">
                <h5 className="no-margin">{playerData[key.index].overall}</h5>
                <div>
                  <input
                    type="number"
                    required
                    id="round"
                    label="Round"
                    name="keeperRound"
                    placeholder="Round Drafted"
                    onChange={(e) => handleKeeperInput(e.target.value, 'round', key.index)}
                    autoFocus
                  />
                  <br></br>
                  <input
                    type="number"
                    required
                    id="round"
                    label="Manager Position"
                    name="keeperManager"
                    placeholder="Manager Position"
                    onChange={(e) => handleKeeperInput(e.target.value, 'manager', key.index)}
                    autoFocus
                  />
                </div>
              </div>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default KeeperList;
