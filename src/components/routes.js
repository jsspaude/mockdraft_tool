/* eslint-disable no-unused-vars */
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

const routes = [
  {
    name: 'SignUp',
    path: '/signup',
    exact: true,
    main: () => <SignUp />,
  },
  {
    name: 'Login',
    path: '/',
    exact: true,
    main: (props) => <Login {...props} />,
  },
];

export default routes;
