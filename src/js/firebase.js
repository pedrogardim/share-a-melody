import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCZdOVLsQ68maHVyJ1Yqr12r2lr2DRHMpM',
  authDomain: 'share-a-melody.firebaseapp.com',
  projectId: 'share-a-melody',
  storageBucket: 'share-a-melody.appspot.com',
  messagingSenderId: '493579951839',
  appId: '1:493579951839:web:267d1d9fa758dc73ecd36a',
  measurementId: 'G-L4FLD2SD1W',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
