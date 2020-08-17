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

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async createUser(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
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

  removeData = (uid, path) => {
    this.database.ref(`${uid}/${path}`).remove();
  };

  moveRecord(oldRef, newRef) {
    console.log(this.database);
    return new Promise((resolve, reject) => {
      this.database
        .ref(oldRef)
        .once('value')
        .then((snap) => this.database.ref(newRef).set(snap.val()))
        .then(() => this.database.ref(oldRef).set(null))
        .then(() => {
          console.log('Done!');
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
