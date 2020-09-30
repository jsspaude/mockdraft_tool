/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { DataContext } from '../../contexts/DataContextProvider';
import PlayerTable from '../PlayerList/PlayerTable';
import ManagerList from '../ManagerList/ManagerList';
import Status from '../Status/Status';

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
  const { dataState, dataDispatch } = React.useContext(DataContext);

  React.useEffect(() => {
    history.push(`/${uid}/draft`);
  }, [history, uid]);

  return (
    <div className="draft-room">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
          <Grid item xs={4}>
            <PlayerTable
              {...props}
              getRowProps={(row) => ({
                style: {
                  display: row.original.drafted ? 'none' : '',
                },
              })}
              buttonLabel="DRAFT"
            />
          </Grid>
          <Grid item xs={4}>
            <ManagerList {...props} />
          </Grid>
          <Grid item xs={4}>
            <Status />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  // return (
  //   <div className={classes.root}>
  //     <Grid container spacing={3}>
  //       <Grid item xs={12}>
  //         <Paper className={classes.paper}>xs=12</Paper>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Paper className={classes.paper}>xs=6</Paper>
  //       </Grid>
  //       <Grid item xs={6}>
  //         <Paper className={classes.paper}>xs=6</Paper>
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Paper className={classes.paper}>xs=3</Paper>
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Paper className={classes.paper}>xs=3</Paper>
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Paper className={classes.paper}>xs=3</Paper>
  //       </Grid>
  //       <Grid item xs={3}>
  //         <Paper className={classes.paper}>xs=3</Paper>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default Draft;
