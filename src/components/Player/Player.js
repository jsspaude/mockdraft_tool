/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { CounterContext } from '../CounterContextProvider';
import { CurrPickContext } from '../CurrPickContextProvider';
import Firebase from '../../calls/base';

const Player = (props) => {
  const { index } = props;
  const [playerData, setPlayerData] = useState(props.data.playerData[index]);
  const [drafted, setDrafted] = useState(false);
  const { currStatus, setCurrStatus } = useContext(CounterContext);
  const { currPick, setCurrPick } = useContext(CurrPickContext);
  const { overall, pos, team } = props.details;
  const posStripped = (position) => position.replace(/[0-9]/g, '');

  const handleDraft = async (e) => {
    e.preventDefault();
    if (props.buttonLabel === 'DRAFT') {
      const newCurrPick = currPick + 1;
      Firebase.updateUserData(props.user, props.newCurrStatus, 'userSettings/currStatus');
      Firebase.updateUserData(props.user, newCurrPick, 'userSettings/currPick');
      setPlayerData({ ...playerData, drafted: props.currStatus });
      setCurrStatus(props.newCurrStatus);
      setCurrPick(currPick + 1);
      setDrafted(true);
      props.handlePlayer({ ...playerData, drafted: props.currStatus });
      props.draftedPlayers();
      Firebase.updateUserData(
        props.user,
        { ...playerData, drafted: props.currStatus },
        `playerData/${index}`,
      );
    } else {
      props.handleKeeper({ ...props.keepers, index });
      setDrafted(true);
    }
  };

  useLayoutEffect(() => {
    if (props.status || props.keeperStatus) {
      setDrafted(true);
    }
  }, [props.status]);

  return (
    <tr className={`player-data ${drafted}`}>
      <td className="name">{overall}</td>
      <td className="pos">{posStripped(pos)}</td>
      <td className="team">{team}</td>
      <td>
        <button onClick={handleDraft}>{props.buttonLabel}</button>
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
