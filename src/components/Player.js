/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { CounterContext } from './CounterContextProvider';
import { counter } from '../helpers';

const Player = (props) => {
  const { index } = props;
  const [currStatus, setCurrStatus] = useContext(CounterContext);
  const [playerData, setPlayerData] = useState(props.data.playerData[index]);
  const [drafted, setDrafted] = useState(false);
  const { overall, pos, team } = props.details;
  const posStripped = pos.replace(/[0-9]/g, '');
  const newCurrStatus = counter(currStatus, props.data.userSettings.managers);

  const handleDraft = async (e) => {
    Firebase.updateUserData(props.user, newCurrStatus, 'userSettings/currStatus');
    setPlayerData({ ...playerData, drafted: currStatus });
    setCurrStatus(newCurrStatus);
    setDrafted(true);
    props.handlePlayer({ ...playerData, drafted: newCurrStatus });
    props.draftedPlayers();
    Firebase.updateUserData(
      props.user,
      { ...playerData, drafted: newCurrStatus },
      `playerData/${index}`,
    );
  };

  Player.propTypes = {
    details: PropTypes.shape({
      overall: PropTypes.string,
      pos: PropTypes.string,
      team: PropTypes.string,
    }),
    user: PropTypes.string,
    data: PropTypes.object,
  };

  useLayoutEffect(() => {
    if (props.status) {
      setDrafted(true);
    }
  }, []);

  return (
    <tr className={`player-data ${drafted}`}>
      <td className="name">{overall}</td>
      <td className="pos">{posStripped}</td>
      <td className="team">{team}</td>
      <td>
        <button onClick={handleDraft}>DRAFT</button>
      </td>
    </tr>
  );
};

export default Player;
