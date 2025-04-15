import { writable } from 'svelte/store';

export const listings = writable([
  { id: 1, name: "Shirt", price: 20, size: "M", color: "Blue" },
  { id: 2, name: "Pants", price: 40, size: "L", color: "Black" }
]);