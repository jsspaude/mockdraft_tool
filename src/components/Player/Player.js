/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { CounterContext } from '../../contexts/CounterContextProvider';
import Firebase from '../../calls/base';
import { AuthContext } from '../../contexts/AuthContextProvider';

const Player = (props) => {
  const { index } = props;
  const [playerData, setPlayerData] = React.useState(props.data.playerData[index]);
  const [drafted, setDrafted] = React.useState(false);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { uid, setUid } = React.useContext(AuthContext);
  const { overall, pos, team } = props.details;

  React.useLayoutEffect(() => {
    if (props.status || props.keeperStatus) {
      setDrafted(true);
    }
  }, [props.status, props.keeperStatus]);

  const posStripped = (position) => position.replace(/[0-9]/g, '');

  const handleDraft = async (e) => {
    e.preventDefault();
    if (props.buttonLabel === 'DRAFT') {
      setPlayerData({ ...playerData, drafted: counterState.currStatus });
      props.handleCounter();
      props.handlePlayer({ ...playerData, drafted: counterState.currStatus, index });
      setDrafted(true);
    } else {
      props.handleKeeper({ ...props.keepers, index });
      setDrafted(true);
    }
  };

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
  handlePlayer: PropTypes.func,
  index: PropTypes.number,
  newCurrStatus: PropTypes.number,
  status: PropTypes.bool,
};

export default Player;
