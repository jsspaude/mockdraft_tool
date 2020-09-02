/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';
import Firebase, { firebaseApp } from '../../calls/base';
import { AuthContext } from '../AuthContextProvider';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const [uid, setUid] = useContext(AuthContext);

  const errorHandler = (e) => {
    setErrors(e.message);
  };

  const handleForm = (e) => {
    e.preventDefault();
    firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(Firebase.login(email, password, errorHandler));
  };

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        history.push(`/${user.uid}`);
        // ReferencePoint use css to help with login flicker https://github.com/firebase/quickstart-js/issues/58
      }
    });
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
          autoComplete="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
          autoComplete="password"
        />

        <button type="submit">Login</button>
        <span>{error}</span>
        <p className="">
          Need to sign up?
          <Link to="/signup" className="">
            Join here
          </Link>
        </p>
      </form>
      <nav className="login">
        <button className="google" onClick={() => Firebase.authenticate('Google')}>
          Login With Google
        </button>
      </nav>
    </div>
  );
};

export default withRouter(Login);
