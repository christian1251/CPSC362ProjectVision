import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase.js'; // correct import


export const user = writable<User | null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
});
