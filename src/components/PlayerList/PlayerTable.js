/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import { counter } from '../../helpers';
import Player from '../Player/Player';
import Firebase from '../../calls/base';

const defaultPropGetter = () => ({});

const PlayerTable = ({
  getRowProps = defaultPropGetter, buttonLabel, handleKeeper, keepers,
}) => {
  const { uid, setUid } = React.useContext(AuthContext);
  const { counterState, counterDispatch } = React.useContext(CounterContext);
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  const { dataState, dataDispatch } = React.useContext(DataContext);
  const { settingsState, settingsDispatch } = React.useContext(SettingsContext);
  const newCurrStatus = counter(counterState.currStatus, settingsState.managers);
  const [tableData, setTableData] = React.useState(Object.values(dataState.playerData));
  const posStripped = (position) => position.replace(/[0-9]/g, '');
  const data = Object.values(dataState.playerData);

  const handlePlayer = React.useCallback(
    (index, info) => {
      resultsDispatch({ type: 'draftPlayer', payload: info });
      dataDispatch({ type: 'draft', index, payload: info });
      Firebase.updateUserData(
        uid,
        { ...info, drafted: counterState.currStatus },
        `playerData/${info.index}`,
      );
    },
    [counterState.currStatus, dataDispatch, resultsDispatch, uid],
  );

  const handleCounter = React.useCallback(() => {
    const newCurrPick = counterState.currPick + 1;
    Firebase.updateUserData(
      uid,
      { keeperPicks: counterState.keeperPicks, currPick: newCurrPick, currStatus: newCurrStatus },
      'userSettings/counter',
    );
    counterDispatch({
      type: 'setCurr',
      currPick: newCurrPick,
      currStatus: newCurrStatus,
    });
  }, [counterDispatch, counterState.currPick, counterState.keeperPicks, newCurrStatus, uid]);

  const handleDrafted = React.useCallback(
    (info) => {
      if (buttonLabel === 'DRAFT') {
        handleCounter();
        handlePlayer(info.index, {
          ...info.original,
          drafted: counterState.currStatus,
          index: info.id,
        });
      } else {
        handleKeeper({ ...keepers, index: info.id });
      }
    },
    [buttonLabel, counterState.currStatus, handleCounter, handleKeeper, handlePlayer, keepers],
  );

  const keeperIndexes = () => {
    const keeperIndexArray = [];
    if (settingsState.keeperList) {
      settingsState.keeperList.forEach((keeper) => keeperIndexArray.push(keeper.index));
    }
    return keeperIndexArray;
  };

  React.useEffect(() => {
    if (counterState.keeperPicks && counterState.keeperPicks.includes(counterState.currStatus)) {
      handleCounter();
    }
  }, [
    counterState.keeperPicks,
    counterState.currStatus,
    newCurrStatus,
    settingsState.counter,
    handleCounter,
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'overall', // accessor is the "key" in the data
      },
      {
        Header: 'Position',
        accessor: (d) => posStripped(d.pos),
      },
      {
        Header: 'Team',
        accessor: 'team',
      },
      {
        id: 'draft-button',
        Header: '',
        Cell: ({ cell }) => <button onClick={() => handleDrafted(cell.row)}>Draft</button>,
      },
    ],
    [handleDrafted],
  );

  const tableInstance = useTable({ columns, data, getRowProps });
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = tableInstance;

  if (tableData) {
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={i} {...row.getRowProps(getRowProps(row))}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <>LOADING</>;

  // return (
  //   <div className="player-list">
  //     <table className="players">
  //       <thead>
  //         <tr>
  //           <th>Name</th>
  //           <th>Position</th>
  //           <th>Team</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {Object.keys(dataState.playerData).map((key) => {
  //           const keeperStatus = keeperIndexes().includes(parseInt(key, 10));
  //           return (
  //             <Player
  //               key={key}
  //               index={parseInt(key, 10)}
  //               details={dataState.playerData[key]}
  //               draftedPlayers={resultsState}
  //               handlePlayer={handlePlayer}
  //               currStatus={counterState.currStatus}
  //               keepers={props.keepers}
  //               keeperStatus={keeperStatus}
  //               handleKeeper={props.handleKeeper}
  //               handleCounter={handleCounter}
  //               buttonLabel={props.buttonLabel}
  //               data={dataState}
  //               status={!!dataState.playerData[key].drafted}
  //             />
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default PlayerTable;
