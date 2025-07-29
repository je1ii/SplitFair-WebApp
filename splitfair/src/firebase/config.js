import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-RsTz2R9R8tRWrTJN2W6FxexhcrdH3TU",
  authDomain: "splitfair-25045.firebaseapp.com",
  projectId: "splitfair-25045",
  storageBucket: "splitfair-25045.firebasestorage.app",
  messagingSenderId: "781160293886",
  appId: "1:781160293886:web:edf9c2b3df95f9fa500caf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);