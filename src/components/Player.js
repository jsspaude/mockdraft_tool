/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { CounterContext } from './CounterContextProvider';
import Firebase from '../calls/base';

const Player = (props) => {
  const { index } = props;
  const [playerData, setPlayerData] = useState(props.data.playerData[index]);
  const [drafted, setDrafted] = useState(false);
  const { currStatus, setCurrStatus } = useContext(CounterContext);
  const { overall, pos, team } = props.details;
  const posStripped = pos.replace(/[0-9]/g, '');

  const handleDraft = async (e) => {
    Firebase.updateUserData(props.user, props.newCurrStatus, 'userSettings/currStatus');
    setPlayerData({ ...playerData, drafted: props.currStatus });
    setCurrStatus(props.newCurrStatus);
    setDrafted(true);
    props.handlePlayer({ ...playerData, drafted: props.currStatus });
    props.draftedPlayers();
    Firebase.updateUserData(
      props.user,
      { ...playerData, drafted: props.currStatus },
      `playerData/${index}`,
    );
  };

  useLayoutEffect(() => {
    if (props.status) {
      setDrafted(true);
    }
  }, [props.status]);

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

Player.propTypes = {
  currStatus: PropTypes.number,
  data: PropTypes.object,
  details: PropTypes.shape({
    overall: PropTypes.string,
    pos: PropTypes.string,
    team: PropTypes.string,
  }),
  draftedPlayers: PropTypes.func,
  handlePlayer: PropTypes.func,
  index: PropTypes.number,
  newCurrStatus: PropTypes.number,
  status: PropTypes.bool,
  user: PropTypes.string,
};

export default Player;
