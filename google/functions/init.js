import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyChNQbbV5Li5FU2sOjEWTY-hIBoy9R9ZSg',
  authDomain: 'storytime-a688b.firebaseapp.com',
  databaseURL: 'https://storytime-a688b.firebaseio.com',
  projectId: 'storytime-a688b',
  storageBucket: 'storytime-a688b.appspot.com',
  messagingSenderId: '669392027502',
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
// export const fb = firebaseApp;
