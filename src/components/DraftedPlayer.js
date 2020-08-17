// eslint-disable-next-line no-unused-vars
import React from 'react';

const DraftedPlayer = (props) => {
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
          return <td>{position.players[posArray[1]].overall}</td>;
        }
      }
      if (playerData && posArray[0].includes('_')) {
        const createFlexCell = () => playerData.find(({ flex }) => flex);
        const flexArray = createFlexCell();
        if (flexArray && flexArray.flex[posArray[1]]) {
          return <td>{flexArray.flex[posArray[1]].overall}</td>;
        }
      }
      if (posArray[0] === 'BENCH') {
        const createBenchCell = () => playerData.find(({ bench }) => bench);
        const benchArray = createBenchCell();
        if (benchArray && benchArray.bench[posArray[1]]) {
          return <td>{benchArray.bench[posArray[1]].overall}</td>;
        }
      }
      return <td></td>;
    }
    return <td></td>;
  };
  return playerDataCell();
};

export default DraftedPlayer;
