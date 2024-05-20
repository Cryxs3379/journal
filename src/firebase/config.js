// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Agrega los SDKs de los productos de Firebase que quieras usar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyCDngTaAnHqwKowb86YJjWcRUMftZWhfMk",
  authDomain: "react-86896.firebaseapp.com",
  projectId: "react-86896",
  storageBucket: "react-86896.appspot.com",
  messagingSenderId: "272242780003",
  appId: "1:272242780003:web:072c0ce41dcbeb7ea21556"
};

// Inicializa Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp); // Autenticación de Firebase
export const FireBaseDB = getFirestore(FireBaseApp); // Base de datos Firestore
