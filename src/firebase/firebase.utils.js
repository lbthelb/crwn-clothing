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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);

  
    const snapShot = await userRef.get();
 
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj)
      });
      
      return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(doc => {
      const {title, items} = doc.data();

      return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    return transformedCollection.reduce((accumulator,collection) =>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    } , {})
  };
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;