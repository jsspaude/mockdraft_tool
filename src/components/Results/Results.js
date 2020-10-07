/* eslint-disable no-unused-vars */
import React from 'react';
import { ResultsContext } from '../../contexts/ResultsContextProvider';

const Results = () => {
  const { resultsState, resultsDispatch } = React.useContext(ResultsContext);
  return (
    <div className="results">
      <ul>
        {resultsState.map((player, key) => (
          <li key={key}>
            <h6>
              {`${player.drafted} - `}
              {`${player.overall} - `}
              <span className="subtext">{`(${player.pos}, ${player.team})`}</span>
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
