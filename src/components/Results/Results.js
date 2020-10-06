/* eslint-disable no-unused-vars */
import React from 'react';
import { ResultsContext } from '../../contexts/ResultsContextProvider';

const Results = () => {
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  return (
    <div className="results">
      <ul>
        <h5>Draft Results</h5>
        {resultsState.map((player, key) => (
          <li key={key}>
            {`${player.drafted} - `}
            {`${player.overall} - `}
            <span className="subtext">{`(${player.pos}, ${player.team})`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
