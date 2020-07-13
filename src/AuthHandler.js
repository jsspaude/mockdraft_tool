/* eslint-disable no-unused-vars */
import React from 'react';
import firebase from 'firebase';
import { firebaseApp, base } from './base';

const authenticate = (provider, email, password) => {
  if (provider !== 'email') {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  }
  if (provider === 'join') {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  if (provider === 'email') {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  return undefined;
};

const syncHandler = async (authData) => {
  const draft = await base.fetch(authData.user.uid, { context: this });
  if (!draft.owner) {
    await base.post(`${authData.user.uid}/owner`, {
      data: authData.user.uid,
    });
  }
};

export default authenticate;
