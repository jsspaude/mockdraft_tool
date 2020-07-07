/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

class PlayerList extends React.Component {
  render() {
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
          {Object.keys(this.props.data).map((key) => (
            <Player key={key} index={key} details={this.props.data[key]} />
          ))}
        </table>
      </div>
    );
  }
}

export default PlayerList;
