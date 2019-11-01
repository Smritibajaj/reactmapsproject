import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase';

const config = {
    apiKey: "AIzaSyBz7cQ0I3bHYdaYb_f1bloZc2qrqXU10CA",
    authDomain: "authandmaps.firebaseapp.com",
    databaseURL: "https://authandmaps.firebaseio.com",
    projectId: "authandmaps",
    storageBucket: "authandmaps.appspot.com",
    messagingSenderId: "956513295424",
    appId: "1:956513295424:web:aed4872d0480b04d3793a5"
}

export const myFirebase = firebase.initializeApp(config);
 
export const  googleProvider = new firebase.auth.GoogleAuthProvider();  
