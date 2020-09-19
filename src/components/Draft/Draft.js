/* eslint-disable no-unused-vars */
import React, { useContext, useState, useLayoutEffect } from 'react';
import PlayerList from '../PlayerList/PlayerList';
import ManagerList from '../ManagerList/ManagerList';
import { DataContext } from '../DataContextProvider';
import ResultsContextProvider from '../ResultsContextProvider';
import CounterContextProvider from '../CounterContextProvider';

const Draft = (props) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="draft-main">
      <CounterContextProvider userSettings={state.userSettings}>
        <PlayerList {...props} buttonLabel="DRAFT" />
      </CounterContextProvider>
      <ManagerList {...props} />
    </div>
  );
};

export default Draft;
