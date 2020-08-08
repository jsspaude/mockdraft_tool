/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
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
    setPlayerData(playerArray());
  }, [props.playerAssign]);

  // HERE - create new component for player pos
  return props.posStringArray.map((pos, key) => (
    <tr key={key} index={key} poscount={pos.replace(/\D/g, '')}>
      <td>{pos.replace(/[0-9]/g, '')}</td>
      <td>
        {' '}
        // NEW COMPONENT HERE
        {playerData
          && playerData.forEach((position) => {
            if (position.pos === pos.replace(/[0-9]/g, '')) {
              const player = position.players[parseInt(pos.replace(/\D/g, ''), 10)];
              if (player) {
                return player.overall;
              }
            }
            return '';
          })}
      </td>
    </tr>
  ));
};

export default ManagerPositions;
