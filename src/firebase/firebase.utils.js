import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDmGwPcUFuSrA1rbNPw-CmOTookvgYmf8U",
    authDomain: "crown-clothing-51802.firebaseapp.com",
    projectId: "crown-clothing-51802",
    storageBucket: "crown-clothing-51802.appspot.com",
    messagingSenderId: "298308635297",
    appId: "1:298308635297:web:6a4f38fecc6decd518fee0",
    measurementId: "G-RW1WPP7RCT"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt:'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;