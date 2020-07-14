/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

const PlayerList = (props) => {
  PlayerList.propTypes = {
    data: PropTypes.object,
  };
  return (
    <div className="player-list">
      <table className="players">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
          </tr>
        </thead>
        {Object.keys(props.data).map((key) => (
          <Player key={key} index={key} details={props.data[key]} />
        ))}
      </table>
    </div>
  );
};

export default PlayerList;
