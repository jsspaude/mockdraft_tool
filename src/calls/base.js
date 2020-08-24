import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB8zX55zSbxsyWNl_Nio1QHOANIK5U5T6k',
  authDomain: 'sweatalus-mock-draft.firebaseapp.com',
  databaseURL: 'https://sweatalus-mock-draft.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

class Firebase {
  constructor() {
    this.auth = firebaseApp.auth();
    this.base = base;
    this.database = firebase.database();
    this.error = '';
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  authHandler = async (authData) => {
    const draft = await base.fetch(authData.user.uid, { context: this });
    if (!draft.owner) {
      await base.post(`${authData.user.uid}/owner`, {
        data: authData.user.uid,
      });
    }
    return draft;
  };

  getData = (uid) => {
    this.base.fetch(`${uid}/data`, {
      context: this,
      then(data) {
        return data;
      },
    });
  };

  dataRef = (user) => firebase.database().ref(`${user}/data`);

  collectData = (user) => this.dataRef(user)
    .once('value')
    .then((snapshot) => snapshot.val());

  login(email, password, errorHandler) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then(this.authHandler)
      .catch((err) => errorHandler(err));
  }

  async createUser(email, password, errorHandler) {
    await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(this.authHandler)
      .catch((err) => errorHandler(err));
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  setUserData(uid, dataValue, dataKey) {
    this.database.ref(`${uid}/${dataKey}`).set({
      ...dataValue,
    });
  }

  updateUserData = (uid, dataValue, dataKey) => {
    const updates = {};
    updates[`/${dataKey}`] = dataValue;
    return this.dataRef(uid).update(updates);
  };

  updateResultsData = (uid, dataValue, dataKey) => new Promise((resolve, reject) => {
    const updates = {};
    updates[`/${dataKey}`] = dataValue;
    this.database
      .ref(`${uid}/results`)
      .update(updates)
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject();
      });
  });

  removeData = (uid, path) => new Promise((resolve, reject) => {
    this.database
      .ref(`${uid}/${path}`)
      .remove()
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject();
      });
  });

  moveRecord(oldRef, newRef) {
    return new Promise((resolve, reject) => {
      this.database
        .ref(oldRef)
        .once('value')
        .then((snap) => this.database.ref(newRef).set(snap.val()))
        .then(() => this.database.ref(oldRef).set(null))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.log(err.message);
          reject();
        });
    });
  }

  copyRecord(oldRef, newRef) {
    this.database.ref(oldRef).once('value', (snap) => {
      this.database.ref(newRef).set(snap.val(), (error) => {
        if (error && typeof console !== 'undefined' && console.error) {
          console.error(error);
        }
      });
    });
  }
}
export { base, firebaseApp };

export default new Firebase();
