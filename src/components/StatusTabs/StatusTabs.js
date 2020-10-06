/* eslint-disable no-unused-vars */
import React from 'react';
import Results from '../Results/Results';
import Status from '../Status/Status';

const StatusTabs = () => {
  const [value, setValue] = React.useState(0);

  return (
    <div className="status-tabs-container">
      <ul>
        <li>
          <h3 className={value === 0 ? 'active' : 'inactive'} onClick={() => setValue(0)}>
            STATUS
          </h3>
        </li>
        <li>
          <h3 className={value === 1 ? 'active' : 'inactive'} onClick={() => setValue(1)}>
            RESULTS
          </h3>
        </li>
      </ul>
      {value === 0 && <Status />}
      {value === 1 && <Results />}
    </div>
  );
};

export default StatusTabs;
