/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from './DataContextProvider';
import CounterContextProvider from './CounterContextProvider';
import Player from './Player';

const PlayerList = (props) => {
  const { state, dispatch } = useContext(DataContext);
  PlayerList.propTypes = {
    uid: PropTypes.string,
    handlePlayer: PropTypes.func,
  };

  return (
    <CounterContextProvider userSettings={state.userSettings}>
      <div className="player-list">
        <table className="players">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(state.playerData).map((key) => (
              <Player
                key={key}
                index={key}
                details={state.playerData[key]}
                draftedPlayers={props.draftedPlayers}
                handlePlayer={props.handlePlayer}
                user={props.uid}
                data={state}
                status={!!state.playerData[key].drafted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </CounterContextProvider>
  );
};

export default PlayerList;
