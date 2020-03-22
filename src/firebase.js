import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const config = {
  apiKey: "AIzaSyDp4k1AVZ8VuwvM1s_FXNWKc2nbgjPw_t4",
  authDomain: "foobarhopper-app.firebaseapp.com",
  databaseURL: "https://foobarhopper-app.firebaseio.com",
  projectId: "foobarhopper-app",
  storageBucket: "foobarhopper-app.appspot.com",
  messagingSenderId: "96015478047",
  appId: "1:96015478047:web:112077afa0af06681c942a"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};

export const signOut = () => {
  auth.signOut();
}

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName: displayName,
        email: email,
        photoUrl: photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user! ', error.message);
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user!', error.message);
  }
}

window.firebase = firebase;

export default firebase;
