/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import DraftedPlayer from './DraftedPlayer';
import { flattenObject } from '../helpers';

const ManagerPositions = (props) => {
  const [playerData, setPlayerData] = useState('');
  const [flexLength, setFlexLength] = useState(0);
  const positionSettings = flattenObject({ ...props.posObjArray });
  const flexSettings = Object.keys(positionSettings)
    .map((key) => {
      if (key.includes('_')) {
        return key;
      }
      return undefined;
    })
    .map((flex) => {
      if (positionSettings[flex] > 0) return { [flex]: positionSettings[flex] };
      return undefined;
    })
    .filter((item) => item !== undefined);
  const flexPositionsArray = Object.keys(...flexSettings)
    .map((key) => key.split('_'))
    .flat();
  const flexCount = Object.values(...flexSettings).reduce((a, b) => a + b);

  const draftedPlayers = props.playerAssign.reduce((acc, curr) => {
    const newP = curr;
    newP.pos = newP.pos.replace(/[0-9]/g, '');
    return acc.concat(newP);
  }, []);

  const playerArray = () => {
    const group = {};
    draftedPlayers.forEach(({ pos, ...rest }, i) => {
      group[pos] = group[pos] || {
        pos,
        players: [],
        bench: [],
        flex: [],
      };
      if (group[pos].players.length < positionSettings[pos]) {
        group[pos].players.push(rest);
      } else if (flexPositionsArray.includes(group[pos].pos)) {
        group[pos].flex.push(rest);
      } else {
        group[pos].bench.push(rest);
      }
    });
    return Object.values(group);
  };

  useLayoutEffect(() => {
    const init = async () => {
      const result = playerArray();
      setPlayerData(result);
    };
    init();
  }, [props.playerAssign]);

  return props.posStringArray.map((pos, key) => (
    <tr key={key} index={key} poscount={pos.replace(/\D/g, '')}>
      <td>{pos.replace(/[0-9]/g, '')}</td>
      <DraftedPlayer pos={pos} playerData={playerData} {...props} />
    </tr>
  ));
};

export default ManagerPositions;
