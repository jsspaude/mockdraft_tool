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

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}
export { base, firebaseApp };

export default new Firebase();
