import { writable } from 'svelte/store';
import { auth } from '$lib/firebase.js';
import { onAuthStateChanged, type User } from 'firebase/auth';

export const user = writable<User | null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser);
});
