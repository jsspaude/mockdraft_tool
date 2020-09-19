/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import AuthContextProvider from './components/AuthContextProvider';

const rootElement = document.getElementById('main');

ReactDOM.render(
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>,
  rootElement,
);
