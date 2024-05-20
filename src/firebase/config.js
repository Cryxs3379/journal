// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDngTaAnHqwKowb86YJjWcRUMftZWhfMk",
  authDomain: "react-86896.firebaseapp.com",
  projectId: "react-86896",
  storageBucket: "react-86896.appspot.com",
  messagingSenderId: "272242780003",
  appId: "1:272242780003:web:072c0ce41dcbeb7ea21556"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp)
export const FireBaseDB = getFirestore(FireBaseApp)