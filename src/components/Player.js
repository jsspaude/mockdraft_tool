import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      overall: PropTypes.string,
      pos: PropTypes.string,
      team: PropTypes.string,
    }),
  };

  render() {
    const { overall, pos, team } = this.props.details;
    const posStripped = pos.replace(/[0-9]/g, '');
    // const isAvailable = status === 'available';
    return (
      <tbody>
        <tr className="player-data">
          <td className="name">{overall}</td>
          <td className="pos">{posStripped}</td>
          <td className="team">{team}</td>
          <td>
            <button>DRAFT</button>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default Player;
