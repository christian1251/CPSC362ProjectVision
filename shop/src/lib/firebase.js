// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBkiEVmLJlppTSjsum0yb9VYs2aJ6RPQY",
  authDomain: "project-e4264.firebaseapp.com",
  projectId: "project-e4264",
  appId: "1:713096037610:web:ca531c260018a76e028393"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
