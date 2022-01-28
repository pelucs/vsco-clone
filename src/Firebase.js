import firebase from 'firebase';
import 'firebase/app';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDfvDRDxzzY-6CQlKB1djJldhBbyPQs9Hk",
  authDomain: "vsco-clone-ad6ef.firebaseapp.com",
  projectId: "vsco-clone-ad6ef",
  storageBucket: "vsco-clone-ad6ef.appspot.com",
  messagingSenderId: "160512511878",
  appId: "1:160512511878:web:b5fd0fffcca91b5d48e607"
});

const auth = firebase.auth();
const database = firebase.firestore();

export { firebase, auth, database };