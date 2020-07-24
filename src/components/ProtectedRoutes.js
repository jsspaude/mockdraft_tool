/* eslint-disable no-unused-vars */
import React from 'react';
import App from './App';
import DataContextProvider from './DataContextProvider';
import { AuthContext } from './AuthContextProvider';

const protectedRoutes = [
  {
    name: 'draft',
    exact: true,
    path: '/:uid',
    main: (props) => (
      <DataContextProvider {...props}>
        <App {...props} />
      </DataContextProvider>
    ),
    public: false,
  },
];

export default protectedRoutes;
