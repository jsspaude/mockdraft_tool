/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import DraftedPlayer from './DraftedPlayer';
import { flattenObject } from '../helpers';

const ManagerPositions = (props) => {
  const [playerData, setPlayerData] = useState('');
  const positionSettings = flattenObject({ ...props.posObjArray });
  const draftedPlayers = props.playerAssign.reduce((acc, curr) => {
    const newP = curr;

    newP.pos = newP.pos.replace(/[0-9]/g, '');

    return acc.concat(newP);
  }, []);

  const playerArray = () => {
    const group = {};
    draftedPlayers.forEach(({ pos, ...rest }, i) => {
      group[pos] = group[pos] || { pos, players: [], bench: [] };
      if (group[pos].players.length < positionSettings[pos]) {
        group[pos].players.push(rest);
      } else {
        group[pos].bench.push(rest);
      }
    });
    return Object.values(group);
  };

  useLayoutEffect(() => {
    const init = async () => {
      await setPlayerData(playerArray());
    };

    init();
  }, [props.playerAssign]);

  // HERE - create new component for player pos
  return props.posStringArray.map((pos, key) => (
    <tr key={key} index={key} poscount={pos.replace(/\D/g, '')}>
      <td>{pos.replace(/[0-9]/g, '')}</td>
      <DraftedPlayer pos={pos} playerData={playerData} {...props} />
    </tr>
  ));
};

export default ManagerPositions;
