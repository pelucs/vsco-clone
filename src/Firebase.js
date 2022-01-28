import firebase from 'firebase';
import 'firebase/app';

const firebaseConfig = firebase.initializeApp({
  apiKey: "SUA CHAVE",
  authDomain: "SUA CHAVE",
  projectId: "SUA CHAVE",
  storageBucket: "SUA CHAVE",
  messagingSenderId: "SUA CHAVE",
  appId: "SUA CHAVE"
});

const auth = firebase.auth();
const database = firebase.firestore();

export { firebase, auth, database };
