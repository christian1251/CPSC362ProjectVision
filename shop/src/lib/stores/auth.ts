import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase.js'; // correct import

// 🔥 FIX: tell writable the type is User | null
export const user = writable<User | null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
});
