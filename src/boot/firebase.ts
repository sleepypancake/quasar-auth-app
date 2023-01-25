import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1gmC-Ul388vh3tmVpgw67lx0zXPojbmU',
  authDomain: 'opus-test-41b86.firebaseapp.com',
  projectId: 'opus-test-41b86',
  storageBucket: 'opus-test-41b86.appspot.com',
  messagingSenderId: '188555530062',
  appId: '1:188555530062:web:eb2d5955c6a311da5bd81f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
