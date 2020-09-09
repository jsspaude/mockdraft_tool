/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ManagerDrafted from '../ManagerDrafted/ManagerDrafted';

const ManagerPositions = (props) => {
  const [playerData, setPlayerData] = useState('');

  useLayoutEffect(() => {
    const draftedPlayers = props.playerAssign.reduce((acc, curr) => {
      const newP = curr;
      newP.pos = newP.pos.replace(/[0-9]/g, '');
      return acc.concat(newP);
    }, []);

    const playerArray = () => new Promise((resolve, reject) => {
      try {
        const group = {};
        const flex = { pos: 'FLEX', players: [] };
        const bench = { pos: 'BENCH', players: [] };
        draftedPlayers.forEach(({ pos, ...rest }, i) => {
          group[pos] = group[pos] || {
            pos,
            players: [],
          };
          if (group[pos].players.length < props.posSettings[pos]) {
            group[pos].players.push({ ...rest, pos });
          } else if (flex.players.length < props.flexCount && props.flexPosArray.includes(pos)) {
            flex.players.push({ ...rest, pos });
          } else {
            bench.players.push({ ...rest, pos });
          }
        });
        resolve([...Object.values(group), flex, bench]);
      } catch (err) {
        reject(console.log(err));
      }
    });
    playerArray().then((res) => setPlayerData(res));
  }, [props]);

  return props.posStringArray.map((pos, key) => (
    <tr key={key} index={key} poscount={pos.replace(/\D/g, '')}>
      <td>{pos.replace(/[0-9]/g, '')}</td>
      <ManagerDrafted pos={pos} playerData={playerData} {...props} />
    </tr>
  ));
};

ManagerPositions.propTypes = {
  data: PropTypes.object,
  flexCount: PropTypes.number,
  flexPosArray: PropTypes.array,
  index: PropTypes.number,
  playerAssign: PropTypes.array,
  posSettings: PropTypes.object,
  posStringArray: PropTypes.array,
};

export default ManagerPositions;
