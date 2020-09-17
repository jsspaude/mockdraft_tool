/* eslint-disable no-unused-vars */
import React, {
  useState, useContext, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { CounterContext } from '../CounterContextProvider';
import Firebase from '../../calls/base';
import { AuthContext } from '../AuthContextProvider';

const Player = (props) => {
  const { index } = props;
  const [playerData, setPlayerData] = useState(props.data.playerData[index]);
  const [drafted, setDrafted] = useState(false);
  const { counterState, counterDispatch } = useContext(CounterContext);
  const [uid, setUid] = useContext(AuthContext);
  const { overall, pos, team } = props.details;
  // const posStripped = (position) => position.replace(/[0-9]/g, '');
  const handleDraft = async (e) => {
    e.preventDefault();
    if (props.buttonLabel === 'DRAFT') {
      const newCurrPick = (await counterState.currPick) + 1;
      await Firebase.updateUserData(
        uid,
        { currPick: newCurrPick, currStatus: props.newCurrStatus },
        'userSettings/counter',
      );
      setPlayerData({ ...playerData, drafted: props.currStatus });
      counterDispatch({
        type: 'setCurr',
        payload: {
          currPick: newCurrPick,
          currStatus: props.newCurrStatus,
        },
      });
      setDrafted(true);
      props.handlePlayer({ ...playerData, drafted: props.currStatus });
      Firebase.updateUserData(
        uid,
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
  }, [props.status, props.keeperStatus]);

  return (
    <tr className={`player-data ${drafted}`}>
      <td className="name">{overall}</td>
      <td className="pos">{}</td>
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
  handlePlayer: PropTypes.func,
  index: PropTypes.number,
  newCurrStatus: PropTypes.number,
  status: PropTypes.bool,
};

export default Player;
