// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import {
//   BrowserRouter, Route, Switch, useParams,
// } from 'react-router-dom';
// import Rebase from 're-base';
// import firebase from 'firebase';
// import firebaseConfig from '../config';
// import Join from './Join';
// import App from './App';
// import Login from './Login';

// export const AuthContext = React.createContext(null);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const base = Rebase.createClass(firebaseApp.database());
// const goToDraft = (id) => {
//   this.props.history.push(`/draft/${id}`);
// };

// const Router = () => {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
//       Is logged in? {JSON.stringify(isLoggedIn)}
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/" AuthContext={AuthContext} component={<Join />} />
//           <Route exact path="/login" component={<Login />} />
//           <Route exact path="/draft/:userName" component={<App />} />
//         </Switch>
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// };

// // {
// //   name: 'Join',
// //   path: '/',
// //   exact: true,
// //   main: () => <Join />,
// // },
// // {
// //   name: 'Login',
// //   path: '/login',
// //   exact: true,
// //   main: () => <Login />,
// // },
// // {
// //   name: 'App',
// //   path: '/draft/:userName',
// //   exact: false,
// //   main: () => <App />,
// // },

// export default Router;
