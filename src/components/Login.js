/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import firebase from 'firebase';
import { withRouter, Link } from 'react-router-dom';
import Firebase, { firebaseApp } from '../base';
import { AuthContext } from './Context';
import authenticate from '../AuthHandler';

const Login = ({ history }) => {
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
        Firebase.login(email, password).then((res) => {
          if (res.user) setUid(res.user.uid);
          localStorage.setItem('uid', res.user.uid);
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

  // const signInWithGoogle = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //     .then(() => {
  //       firebase
  //         .auth()
  //         .signInWithPopup(provider)
  //         .then((res) => {
  //           setUid(res.user.uid);
  //           localStorage.setItem('uid', res.user.uid);
  //           history.push(`/draft/${res.user.uid}`);
  //         })
  //         .catch((e) => setErrors(e.message));
  //     });
  // };
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
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />

        {/* <button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button> */}
        <button type="submit">Login</button>
        <span>{error}</span>
        <p className="">
          Need to sign up?{' '}
          <Link to="/signup" className="">
            Join here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Login);
