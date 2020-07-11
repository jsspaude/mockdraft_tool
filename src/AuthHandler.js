/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { base } from './base';
import AuthContextProvider, { AuthContext } from './components/Context';

const AuthHandlerComponent = () => {
  const [uid, setUid] = useContext(AuthContext);
};

const AuthHandler = async (authData) => {
  const draft = await base.fetch(authData.user.uid, { context: this });
  if (!draft.owner) {
    await base.post(`${authData.user.uid}/owner`, {
      data: authData.user.uid,
    });
  }
};

export default AuthHandler;
