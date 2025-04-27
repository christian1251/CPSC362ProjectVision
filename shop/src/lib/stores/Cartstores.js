// Stores items in cart
import { writable } from 'svelte/store';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} size
 * @property {string} color
 */

/**
 * @typedef {Product & { quantity: number }} CartItem
 */

/** @type {import('svelte/store').Writable<CartItem[]>} */
export const cart = writable([]);

import { auth, db } from '../firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/** @type {import('firebase/auth').User|null} */
let currentUser = null;

// Track logged-in user and load cart
onAuthStateChanged(auth, async (user) => {
    currentUser = user;

    if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
            cart.set(cartSnap.data().items);
        } else {
            cart.set([]);
        }
    } else {
        cart.set([]);
    }
});

// Save cart to Firestore whenever it changes
cart.subscribe(async (cartItems) => {
    if (currentUser) {
        const cartRef = doc(db, "carts", currentUser.uid);
        await setDoc(cartRef, { items: cartItems });
    }
});
