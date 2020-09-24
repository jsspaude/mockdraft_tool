/* eslint-disable no-unused-vars */
import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import Firebase from '../../calls/base';
import { AuthContext } from '../../contexts/AuthContextProvider';

const SignUp = () => {
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
    Firebase.createUser(email, password, errorHandler);
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
      <h1>Signup</h1>
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
        <p className="">
          Already have an account?
          <Link to="/login" className="">
            Login Here
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

export default withRouter(SignUp);
