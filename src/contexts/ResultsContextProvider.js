/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useEffect } from 'react';
import { DataContext } from './DataContextProvider';

const ResultsContext = React.createContext(null);

const draftedPlayers = (playerData) => {
  const req = Object.values(playerData)
    .map((player) => {
      if (player.drafted !== false) {
        return player;
      }
      return null;
    })
    .filter((item) => item != null);
  return req;
};

const resultsDataReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return draftedPlayers(action.payload);
    case 'draftPlayer':
      return [...state, { ...action.payload }];
    default:
      return null;
  }
};

const ResultsContextProvider = (props) => {
  const { dataState, dataDispatch } = useContext(DataContext);
  const [resultsState, resultsDispatch] = useReducer(
    resultsDataReducer,
    draftedPlayers(dataState.playerData),
  );

  useEffect(() => {
    resultsDispatch({ type: 'init', payload: dataState.playerData });
  }, [dataState]);

  return (
    <ResultsContext.Provider value={{ resultsState, resultsDispatch }}>
      {props.children}
    </ResultsContext.Provider>
  );
};

export { ResultsContext };

export default ResultsContextProvider;
