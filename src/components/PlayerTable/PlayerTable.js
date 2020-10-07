/* eslint-disable no-unused-vars */
import React from 'react';
import {
  useTable, useFilters, useGlobalFilter, useSortBy,
} from 'react-table';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { CounterContext } from '../../contexts/CounterContextProvider';
import { ResultsContext } from '../../contexts/ResultsContextProvider';
import { SettingsContext } from '../../contexts/SettingsContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import { counter } from '../../helpers';
import {
  Filter, GlobalFilter, DefaultColumnFilter, SelectColumnFilter,
} from '../Filters/Filters';
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
  const data = React.useMemo(() => Object.values(dataState.playerData), [dataState.playerData]);

  function currManager() {
    const index = (
      (counterState.currStatus - Math.trunc(counterState.currStatus)).toFixed(2) * 100
    ).toFixed(0);
    const manager = settingsState.names[index];
    if (manager) {
      return manager;
    }
    return `Manager-${index}`;
  }

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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Rnk',
        accessor: 'rank',
        disableFilters: true,
      },
      {
        Header: 'Name',
        accessor: 'overall',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        id: 'draft-pos',
        Header: '',
        accessor: (d) => posStripped(d.pos),
        Filter: SelectColumnFilter,
        filter: 'equals',
        disableSortBy: true,
      },
      {
        Header: 'ADP',
        accessor: (d) => (Number(d.adp) ? Number(d.adp) : 1000),
        disableFilters: true,
      },
      {
        Header: 'Team',
        accessor: 'team',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        id: 'draft-button',
        Header: '',
        disableSortBy: true,
        Cell: ({ cell }) => (
          <div className="draft-button-container">
            <button onClick={() => handleDrafted(cell.row)}>{buttonLabel}</button>
          </div>
        ),
      },
    ],
    [handleDrafted, buttonLabel],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );

  const generateSortingIndicator = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? ' 🔽' : ' 🔼';
    }
    return '';
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

  if (tableData) {
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
          <tr className="global-filter">
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={`players ${i}`} {...row.getRowProps(getRowProps(row))}>
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
};

export default PlayerTable;
