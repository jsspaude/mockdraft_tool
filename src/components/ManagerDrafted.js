// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const ManagerDrafted = (props) => {
  const { pos } = props;
  const { playerData } = props;
  const posStripped = pos.split(/([0-9]+)/);
  const posArray = posStripped.filter((el) => el !== '');

  const playerDataCell = () => {
    if (props.playerData) {
      // eslint-disable-next-line no-shadow
      const createCell = () => playerData.find(({ pos }) => pos === posArray[0]);
      const position = createCell();
      if (position) {
        if (position.players[posArray[1]]) {
          const drafted = Math.trunc(position.players[posArray[1]].drafted);
          return (
            <>
              <td>
                {position.players[posArray[1]].overall}
                <span className="subtext"> ({position.players[posArray[1]].team})</span>
              </td>
              <td>{drafted}</td>
            </>
          );
        }
      }
      if (posArray[0].includes('_')) {
        // eslint-disable-next-line no-shadow
        const createFlexCell = () => playerData.find(({ pos }) => pos === 'FLEX');
        const flexArray = createFlexCell();
        if (flexArray && flexArray.players[posArray[1]]) {
          return <td>{flexArray.players[posArray[1]].overall}</td>;
        }
      }
      if (posArray[0] === 'BENCH') {
        // eslint-disable-next-line no-shadow
        const createBenchCell = () => playerData.find(({ pos }) => pos === 'BENCH');
        const benchArray = createBenchCell();
        if (benchArray && benchArray.players[posArray[1]]) {
          return <td>{benchArray.players[posArray[1]].overall}</td>;
        }
      }
      return <td></td>;
    }
    return <td></td>;
  };
  return playerDataCell();
};

ManagerDrafted.propTypes = {
  data: PropTypes.object,
  flexCount: PropTypes.number,
  flexPosArray: PropTypes.array,
  index: PropTypes.number,
  playerAssign: PropTypes.array,
  playerData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  pos: PropTypes.string,
  posSettings: PropTypes.object,
  posStringArray: PropTypes.array,
};

export default ManagerDrafted;
