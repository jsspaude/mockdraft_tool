/* eslint-disable no-unused-vars */
import React, { useState, useContext, useLayoutEffect } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import firebase from 'firebase';
// import AuthContext, { UidContext } from './Context';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const Auth = useContext(AuthContext);
  const { uid, setUid } = useContext(UidContext);
  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            if (res.user) Auth.setLoggedIn(true);
            history.push(`/draft/${res.user.uid}`);
            setUid(uid);
          })
          .catch(() => {
            setErrors(e.message);
          });
      });
  };

  useLayoutEffect(() => {
    const user = localStorage.getItem('uid');
    if (user) history.push(`/draft/${user}`);
  });

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((res) => {
            history.push(`/draft/${res.user.uid}`);
            Auth.setLoggedIn(true);
          })
          .catch((e) => setErrors(e.message));
      });
  };

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
        <hr />
        <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Join With Google
        </button>

        <button type="submit">Login</button>

        <span>{error}</span>
      </form>
      <p className="">
        Already have an account?{' '}
        <Link to="/login" className="">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default withRouter(SignUp);
