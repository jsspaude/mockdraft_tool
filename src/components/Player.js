/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { DataContext } from './DataContextProvider';

const Player = (props) => {
  const { state, dispatch, inProgress } = useContext(DataContext);
  const { overall, pos, team } = props.details;
  const posStripped = pos.replace(/[0-9]/g, '');
  const { index } = props;
  const value = props.details;

  const handleDraft = async (e) => {
    await dispatch({
      type: 'draftPlayer',
      payload: index,
      curr: state.userSettings.currStatus,
    });
    props.handlePlayer({ [index]: value });
  };

  useEffect(() => {
    Firebase.updateUserData(props.user, state.playerData[index], `playerData/${index}`);
    Firebase.updateUserData(props.user, state.userSettings.currStatus, 'userSettings/currStatus');
    Firebase.updateUserData(props.user, state.managerData, 'managerData');
  }, [state, props, index, value]);

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
