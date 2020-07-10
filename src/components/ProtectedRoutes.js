/* eslint-disable no-unused-vars */
import React from 'react';
import Draft from './Draft';

const protectedRoutes = [
  {
    name: 'draft',
    exact: true,
    path: '/draft/*',
    main: (props) => <Draft {...props} />,
    public: false,
  },
];

export default protectedRoutes;
