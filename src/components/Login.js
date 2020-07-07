/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

const Login = (props) => (
  <nav className="login">
    <input type="text" required placeholder="Store Name" onLoad={getFunName()} />
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="google" onClick={() => props.authenticate('Google')}>
      Login With Google
    </button>
    <button className="twitter" onClick={() => props.authenticate('Twitter')}>
      Login With Twitter
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
