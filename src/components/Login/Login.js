/* eslint-disable no-unused-vars */
import React from 'react';
import firebase from 'firebase/app';
import { withRouter, Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Firebase from '../../calls/base';
import { AuthContext } from '../../contexts/AuthContextProvider';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="https://jessspaude.ca" target="_blank" rel="noopener noreferrer">
        JSS DEV/DESIGN
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setErrors] = React.useState('');
  const [login, setLogin] = React.useState(true);
  const { uid, setUid } = React.useContext(AuthContext);
  const history = useHistory();

  const loginBool = () => (login ? 'Login' : 'Sign Up');
  const loginMessage = () => (login ? "Don't have an account? Sign Up" : 'Have an account? Login');

  const errorHandler = (e) => {
    setErrors(e.message);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (login) {
      Firebase.login(email, password, errorHandler);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUid({ type: 'loggedIn', payload: user.uid });
          history.push(`/${user.uid}`);
        }
      });
    } else {
      Firebase.createUser(email, password, errorHandler);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUid({ type: 'loggedIn', payload: user.uid });
          history.push(`/${user.uid}`);
        }
      });
    }
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
    <div className="login-container">
      <h1>{loginBool()}</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>{error}</span>
        <Button className="custom-button" type="submit" fullWidth>
          Sign In
        </Button>
        <Button className="custom-button" fullWidth onClick={() => handleGoogleLogin()}>
          Login with Google
        </Button>
        <div className="login-link">
          <h5 onClick={() => setLogin(!login)}>{loginMessage()}</h5>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </div>
  );
};

export default withRouter(Login);
