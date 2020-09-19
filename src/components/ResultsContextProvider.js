/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../calls/base';
import { DataContext } from './DataContextProvider';

const ResultsContext = React.createContext(null);

const draftedPlayers = (playerData) => {
  if (playerData) {
    let playerDataArray = [];
    if (Array.isArray(playerData)) {
      playerDataArray = playerData;
    } else {
      playerDataArray = Object.entries(playerData);
    }
    const req = playerDataArray
      .map((player) => {
        if (player.drafted !== false) {
          return player;
        }
        return null;
      })
      .filter((item) => item != null);
    return req;
  }
  return null;
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
  const { state, dispatch } = useContext(DataContext);
  const [resultsState, resultsDispatch] = useReducer(
    resultsDataReducer,
    draftedPlayers(state.playerData),
  );

  useEffect(() => {
    resultsDispatch({ type: 'init', payload: state.playerData });
  }, [state]);

  return (
    <ResultsContext.Provider value={{ resultsState, resultsDispatch }}>
      {props.children}
    </ResultsContext.Provider>
  );
};

ResultsContextProvider.propTypes = {
  uid: PropTypes.string,
};

export { ResultsContext };

export default ResultsContextProvider;
