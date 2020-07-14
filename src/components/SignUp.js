/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import Firebase, { firebaseApp } from '../calls/base';
import { AuthContext } from './Context';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const [uid, setUid] = useContext(AuthContext);
  const handleForm = (e) => {
    e.preventDefault();
    firebaseApp
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        Firebase.createUser(email, password).then((res) => {
          if (res.user) setUid(res.user.uid);
          history.push(`/draft/${res.user.uid}`);
        });
      });
  };

  useLayoutEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        history.push(`/draft/${user.uid}`);
        // ReferencePoint use css to help with login flicker https://github.com/firebase/quickstart-js/issues/58
      }
    });
  });

  return (
    <div>
      <h1>Join</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
        <span>{error}</span>
      </form>
      <nav className="login">
        <button className="google" onClick={() => Firebase.authenticate('Google')}>
          Login With Google
        </button>
        <button className="facebook" onClick={() => Firebase.authenticate('Twitter')}>
          Login With facebook
        </button>
      </nav>
    </div>
  );
};

export default withRouter(SignUp);
