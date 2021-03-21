import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

  let firebaseConfig = {
    apiKey: "AIzaSyB1Rl5HlcnXYvNjSZpr7QugUiiD_Nj7N10",
    authDomain: "reactapp-76536.firebaseapp.com",
    projectId: "reactapp-76536",
    storageBucket: "reactapp-76536.appspot.com",
    messagingSenderId: "623690341768",
    appId: "1:623690341768:web:0be363776812c147bdee3d",
    measurementId: "G-J8FJ0TE79D"
  };

  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
  }else {
     firebase.app();
  }

export default firebase;
