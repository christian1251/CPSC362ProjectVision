import { writable } from 'svelte/store';

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} size
 * @property {string} color
 */

/** @type {import('svelte/store').Writable<Product[]>} */
export const cart = writable([]);