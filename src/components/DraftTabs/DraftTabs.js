import React from 'react';
import PlayerTable from '../PlayerTable/PlayerTable';
import ManagerList from '../ManagerList/ManagerList';
import Results from '../Results/Results';
import Status from '../Status/Status';

const DraftTabs = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <div className="status-tabs-container">
      <div className="status-tabs-labels">
        <ul>
          <li>
            <h4 className={value === 0 ? 'active' : 'inactive'} onClick={() => setValue(0)}>
              ROSTERS
            </h4>
          </li>
          <li>
            <h4 className={value === 1 ? 'active' : 'inactive'} onClick={() => setValue(1)}>
              PLAYERS
            </h4>
          </li>
          <li>
            <h4 className={value === 2 ? 'active' : 'inactive'} onClick={() => setValue(2)}>
              STATUS
            </h4>
          </li>
          <li>
            <h4 className={value === 3 ? 'active' : 'inactive'} onClick={() => setValue(3)}>
              RESULTS
            </h4>
          </li>
        </ul>
      </div>
      {value === 0 && <ManagerList {...props} />}
      {value === 1 && (
        <PlayerTable
          {...props}
          getRowProps={(row) => ({
            style: {
              display: row.original.drafted ? 'none' : '',
            },
          })}
          buttonLabel="DRAFT"
        />
      )}
      {value === 2 && <Status />}
      {value === 3 && <Results />}
    </div>
  );
};

export default DraftTabs;
