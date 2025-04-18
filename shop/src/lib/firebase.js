import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBkiEVmLJlppTSjsum0yb9VYs2aJ6RPQY",
  authDomain: "project-e4264.firebaseapp.com",
  projectId: "project-e4264",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);