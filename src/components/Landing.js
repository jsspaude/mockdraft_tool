/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import firebase, { auth } from 'firebase';
import base, { firebaseApp } from '../base';
import Settings from './Settings';
import Login from './Login';

export const AuthContext = React.createContext(null);

class Landing extends React.Component {
  static propTypes = {};

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.authHandler({ user });
    //   }
    // });
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.draftName, { context: this });
    if (!store.draftName) {
      await base.post(`${this.props.draftName}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user.
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. check if they are not the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    return <Settings />;
  }
}

export default Landing;
