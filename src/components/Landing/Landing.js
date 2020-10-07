/* eslint-disable no-unused-vars */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const Landing = ({ component: Component }) => (
  <Grid container className="landing-page">
    <Grid item xs={12} sm={4} md={7} className="landing-image" />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div>
        <Component />
      </div>
    </Grid>
  </Grid>
);

export default Landing;
