import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Initialize Firebase

//Colocar em variaveis de ambientes
const firebaseConfig = {
  apiKey: "AIzaSyCnFp4cbDREXcGbUMfqPOR92xk-H4XwAf0",
  authDomain: "aula0507.firebaseapp.com",
  projectId: "aula0507",
  storageBucket: "aula0507.appspot.com",
  messagingSenderId: "3473043486",
  appId: "1:3473043486:web:0eb48e59f7fa7023d0be0f",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export { app, db };
