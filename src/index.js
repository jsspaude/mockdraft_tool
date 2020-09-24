/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import AuthContextProvider from './contexts/AuthContextProvider';

const rootElement = document.getElementById('main');

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  rootElement,
);
