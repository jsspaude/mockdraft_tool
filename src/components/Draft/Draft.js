/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../../contexts/AuthContextProvider';
import PlayerTable from '../PlayerTable/PlayerTable';
import ManagerList from '../ManagerList/ManagerList';
import StatusTabs from '../StatusTabs/StatusTabs';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const date = new Date();
const components = [
  date.getYear(),
  date.getMonth(),
  date.getDate(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
  date.getMilliseconds(),
];
const id = components.join('');

const Draft = (props) => {
  const { uid, setUid } = React.useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    history.push(`/${uid}/draft`);
  }, [history, uid]);

  return (
    <div className="draft-room">
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <div className="manager-container">
              <h3>ROSTERS</h3>
              <ManagerList {...props} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="player-container">
              <h3>PLAYERS</h3>
              <PlayerTable
                {...props}
                getRowProps={(row) => ({
                  style: {
                    display: row.original.drafted ? 'none' : '',
                  },
                })}
                buttonLabel="DRAFT"
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="status-container">
              <StatusTabs />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Draft;
