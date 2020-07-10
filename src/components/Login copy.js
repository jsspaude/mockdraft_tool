/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import * as firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../index';
import Header from './Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const [userName, setUserName] = useState('');
  const history = useHistory();

  const Auth = useContext(AuthContext);
  function handleClick() {
    history.push('/draft/:userName}');
  }
  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res.user) {
          const user = email.substring(0, email.lastIndexOf('@'));
          setUserName(user);
          Auth.setLoggedIn(true);
          handleClick();
        }
      })
      // .then(goToDraft(email))
      .catch((e) => {
        setErrors(e.message);
      });
  };

  return (
    <div>
      <Header />
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
        <hr />
        <button className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
        <button type="submit">Login</button>
        <span>{error}</span>
      </form>
    </div>
  );
};

export default Login;
