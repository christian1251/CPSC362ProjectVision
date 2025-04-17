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
export const listings = writable([
  { id: 1, name: 'T-Shirt', price: 25, size: 'M', color: 'Blue' },
  { id: 2, name: 'Hoodie', price: 40, size: 'L', color: 'Black' },
  { id: 3, name: 'Jeans', price: 50, size: 'S', color: 'Gray' }
]);