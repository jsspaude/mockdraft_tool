/* eslint-disable no-unused-vars */
import React from 'react';
import App from './App';

const protectedRoutes = [
  {
    name: 'draft',
    exact: true,
    path: '/:uid',
    main: (props) => <App {...props} />,
    public: false,
  },
];

export default protectedRoutes;
