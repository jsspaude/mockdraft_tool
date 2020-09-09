/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PlayerList from '../PlayerList/PlayerList';

const KeeperList = (props) => {
  const [keepers, setKeepers] = useState('');
  const { playerData } = props;

  const handleKeeper = (info) => {
    setKeepers([...keepers, { index: info.index }]);
    props.setKeeperList([...keepers, { index: info.index }]);
  };
  const handleKeeperInput = (e, label, playerIndex) => {
    const newKeepers = keepers.map((keeper) => {
      if (keeper.index === playerIndex) {
        return { ...keeper, [label]: parseInt(e, 10) };
      }
      return keeper;
    });
    setKeepers(newKeepers);
    props.setKeeperList(newKeepers);
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
