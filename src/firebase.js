// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAWCNK9XMVUCvQ5kN1SDOktRa6Z-ykRAzo",
  authDomain: "quickbill01.firebaseapp.com",
  projectId: "quickbill01",
  storageBucket: "quickbill01.appspot.com",
  messagingSenderId: "372940408648",
  appId: "1:372940408648:web:e8062925a0b54e553d157d",
  measurementId: "G-TEM4LWCDKV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup ,onAuthStateChanged };
export default app;
