/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LeagueName from './LeagueName';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LeagueName} />
      <Route path="/draft/:draftName" component={App} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
