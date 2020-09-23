/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PlayerList from '../PlayerList/PlayerList';
import { SettingsContext } from '../../contexts/SettingsContextProvider';

const KeeperList = (props) => {
  const [keepers, setKeepers] = useState('');
  const { settingsState, settingsDispatch } = useContext(SettingsContext);
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
      <PlayerList keepers={keepers} handleKeeper={handleKeeper} buttonLabel="KEEP" />
      <div className="keeper-player-info">
        {keepers
          && keepers.map((key, i) => (
            <div key={i} index={key.index} className="keeper-player-input">
              <label>{playerData[key.index].overall}</label>
              <div>
                <label>ROUND</label>
                <input
                  type="number"
                  name="keeperRound"
                  onChange={(e) => handleKeeperInput(e.target.value, 'round', key.index)}
                />
              </div>
              <div>
                <label>MANAGER DRAFT POSITION</label>
                <input
                  type="number"
                  name="keeperRound"
                  onChange={(e) => handleKeeperInput(e.target.value, 'manager', key.index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KeeperList;
