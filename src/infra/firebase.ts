import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'noteballs-475ac.firebaseapp.com',
  projectId: 'noteballs-475ac',
  storageBucket: 'noteballs-475ac.appspot.com',
  messagingSenderId: '683714693352',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
