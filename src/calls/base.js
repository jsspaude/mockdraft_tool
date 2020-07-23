import Rebase from 're-base';
import firebase from 'firebase';

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

  dataRef = (user) => firebase.database().ref(`${user}/data`);

  collectData = (user) => this.dataRef(user)
    .once('value')
    .then((snapshot) => {
      const settings = (snapshot.val() && snapshot.val().userSettings) || '';
      const players = (snapshot.val() && snapshot.val().playerData) || '';
      return { settings, players };
    });

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

  // writeDataHandler = async (user, input) => {
  //   const draft = await base.fetch(user, { context: this });
  //   if (!draft.owner) {
  //     await base.post(`${user}/players`, {
  //       data: input,
  //     });
  //   }
  // };

  setUserData(uid, dataValue, dataKey) {
    this.database.ref(`${uid}/data/${dataKey}`).set({
      ...dataValue,
    });
  }

  updateUserData = (uid, dataValue, dataKey) => {
    const updates = {};
    updates[`/${dataKey}`] = dataValue;
    console.log(updates);

    return this.dataRef(uid).update(updates);
  };
}
export { base, firebaseApp };

export default new Firebase();
