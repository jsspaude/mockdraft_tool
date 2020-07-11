import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB8zX55zSbxsyWNl_Nio1QHOANIK5U5T6k',
  authDomain: 'sweatalus-mock-draft.firebaseapp.com',
  databaseURL: 'https://sweatalus-mock-draft.firebaseio.com',
});

// const firebaseApp = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(firebaseApp.database());

export { base };

export default firebaseApp;
