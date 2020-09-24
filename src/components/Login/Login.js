/* eslint-disable no-unused-vars */
import React from 'react';
import firebase from 'firebase/app';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Firebase from '../../calls/base';
import { AuthContext } from '../../contexts/AuthContextProvider';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setErrors] = React.useState('');
  const { uid, setUid } = React.useContext(AuthContext);
  const history = useHistory();

  const errorHandler = (e) => {
    setErrors(e.message);
  };

  const handleForm = (e) => {
    e.preventDefault();
    Firebase.login(email, password, errorHandler);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid({ type: 'loggedIn', payload: user.uid });
        history.push(`/${user.uid}`);
      }
    });
  };

  const handleGoogleLogin = () => {
    Firebase.authenticate('Google');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid({ type: 'loggedIn', payload: user.uid });
        history.push(`/${user.uid}`);
      }
    });
  };

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
            Signup Here
          </Link>
        </p>
      </form>
      <nav className="login">
        <button className="google" onClick={() => handleGoogleLogin()}>
          Login With Google
        </button>
      </nav>
    </div>
  );
};

export default withRouter(Login);
