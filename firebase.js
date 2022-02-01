import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDN0gryTqb06ZlVnwnHazpMlDHm8oAPPbM",
  authDomain: "vue-list-d20a9.firebaseapp.com",
  projectId: "vue-list-d20a9",
  storageBucket: "vue-list-d20a9.appspot.com",
  messagingSenderId: "484699947008",
  appId: "1:484699947008:web:51c09e97493f09e45418e5",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const profileCollection = db.collection("profile");
const tasksCollection = db.collection("tasks");

export { db, auth, googleProvider, profileCollection, tasksCollection };
