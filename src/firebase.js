import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBztPny9DspgY_G6oxOGqUjQVjRXYYRCng",
  authDomain: "twitter-25563.firebaseapp.com",
  projectId: "twitter-25563",
  storageBucket: "twitter-25563.appspot.com",
  messagingSenderId: "902510970178",
  appId: "1:902510970178:web:44d15fa8252b8bd99f74db",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();
