/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { flattenObject } from '../helpers';

const ManagerPositions = (props) => {
  const [playerData, setPlayerData] = useState('');
  const draftedPlayers = props.playerAssign.reduce((acc, curr) => {
    const newP = curr;

    newP.pos = newP.pos.replace(/[0-9]/g, '');

    return acc.concat(newP);
  }, []);

  const playerArray = () => {
    const group = {};

    draftedPlayers.forEach(({ pos, ...rest }) => {
      group[pos] = group[pos] || { pos, players: [] };
      group[pos].players.push(rest);
    });
    return Object.values(group);
  };

  useEffect(() => {
    setPlayerData(playerArray());
  }, [props.playerAssign]);

  const posDetails = props.posStringArray.map((pos, key) => (
    <tr key={key} index={key}>
      <td>{pos}</td>
      <td>{}</td>
    </tr>
  ));
  return posDetails;
};

export default ManagerPositions;
