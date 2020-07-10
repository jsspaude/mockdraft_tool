/* eslint-disable no-unused-vars */
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import Draft from './Draft';

const routes = [
  {
    name: 'SignUp',
    path: '/',
    exact: true,
    main: () => <SignUp />,
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    main: () => <Login />,
  },
];

export default routes;
