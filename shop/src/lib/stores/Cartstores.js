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