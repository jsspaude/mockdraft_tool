/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { DataContext } from './DataContextProvider';

const Player = (props) => {
  const [playerData, setPlayerData] = useContext(DataContext);
  const { overall, pos, team } = props.details;
  const posStripped = pos.replace(/[0-9]/g, '');

  // const reducer = (data, action) => {
  //   if (action.type === 'draft') {
  //     return data.map((d) => {
  //       if (d.) player.drafted = true;
  //     });
  //   }
  // };

  const handleDraft = () => {
    const { index } = props;
    const value = props.details;
    const newPlayerObject = { ...value, drafted: true };
    props.handlePlayer({ [index]: value });
    Firebase.updateUserData(props.user, newPlayerObject, `playerData/${index}`);
    console.log(playerData.aaron - jones);
  };
  // store player as a local state and then update it so it re-renders.
  // Adjust this state change in firebase
  // so when app get realoaded it pulls form up to date firebase
  // const isAvailable = status === 'available';

  Player.propTypes = {
    details: PropTypes.shape({
      overall: PropTypes.string,
      pos: PropTypes.string,
      team: PropTypes.string,
    }),
  };

  return (
    <tbody>
      <tr className="player-data">
        <td className="name">{overall}</td>
        <td className="pos">{posStripped}</td>
        <td className="team">{team}</td>
        <td>
          <button onClick={handleDraft}>DRAFT</button>
        </td>
      </tr>
    </tbody>
  );
};

export default Player;
