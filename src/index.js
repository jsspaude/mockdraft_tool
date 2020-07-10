/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rebase from 're-base';
import firebase from 'firebase';
import Header from './components/Header';
import routes from './components/routes';
import firebaseConfig from './config';
import protectedRoutes from './components/ProtectedRoutes';
import ProtectedRouteHoc from './components/ProtectedRouteHoc';

const AuthContext = React.createContext(null);
const UidContext = React.createContext(null);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(firebaseApp.database());

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);

  // function readSession() {
  //   const user = window.sessionStorage.getItem(
  //     `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`,
  //   );
  //   if (user) {
  //     setLoggedIn(true);
  //     const userid = user.uid;
  //     console.log(userid);
  //   }
  // }
  useEffect(() => {
    console.log(firebase);
  });

  // Reference_Point_01 - getting local storage to work vs session storage

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      const userid = user.uid;
      console.log(userid);
    }
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <UidContext.Provider value={{ uid, setUid }}>
        Is logged in? {JSON.stringify(isLoggedIn)}
        <div className="App">
          <Router>
            <Header
              isLoggedIn={isLoggedIn}
              authContext={AuthContext}
              routes={routes}
              uidContext={UidContext}
            />

            <Switch>
              {protectedRoutes.map((route) => (
                <ProtectedRouteHoc
                  key={route.path}
                  isLoggedIn={isLoggedIn}
                  path={route.path}
                  component={route.main}
                  exact={route.exact}
                  public={route.public}
                />
              ))}
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Switch>
          </Router>
        </div>
      </UidContext.Provider>
    </AuthContext.Provider>
  );
};
export { AuthContext, UidContext, base };
export default App;
const rootElement = document.getElementById('main');
ReactDOM.render(<App />, rootElement);
