/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { CounterContext } from './CounterContextProvider';
import { counter } from '../helpers';

const Player = (props) => {
  const { index } = props;
  const [isWaiting, setIsWaiting] = useState(false);
  const [currStatus, setCurrStatus] = useContext(CounterContext);
  const [playerData, setPlayerData] = useState(props.data.playerData[index]);
  const { overall, pos, team } = props.details;
  const posStripped = pos.replace(/[0-9]/g, '');
  const newCurrStatus = counter(currStatus, props.data.userSettings.managers);

  const handleDraft = async (e) => {
    Firebase.updateUserData(props.user, newCurrStatus, 'userSettings/currStatus');
    setCurrStatus(newCurrStatus);
    setPlayerData({ ...playerData, drafted: newCurrStatus });
    props.handlePlayer({ ...playerData, drafted: newCurrStatus });
    Firebase.updateUserData(
      props.user,
      { ...playerData, drafted: newCurrStatus },
      `playerData/${index}`,
    );
  };

  // useEffect(() => {

  // }, [currStatus]);

  Player.propTypes = {
    details: PropTypes.shape({
      overall: PropTypes.string,
      pos: PropTypes.string,
      team: PropTypes.string,
    }),
    user: PropTypes.string,
    data: PropTypes.object,
  };

  return (
    <tbody>
      <tr className="player-data">
        <td className="name">{overall}</td>
        <td className="pos">{posStripped}</td>
        <td className="team">{team}</td>
        <td>
          <button disabled={isWaiting} onClick={handleDraft}>
            DRAFT
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Player;
