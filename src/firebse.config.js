import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB551Kv1bMaPYukeLC8mWRI0AQ-MQi-ejI",
  authDomain: "vision-store-97af0.firebaseapp.com",
  projectId: "vision-store-97af0",
  storageBucket: "vision-store-97af0.appspot.com",
  messagingSenderId: "591167312348",
  appId: "1:591167312348:web:72a84cffe77d0a56ad7f19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app