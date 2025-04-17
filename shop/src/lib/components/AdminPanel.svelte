<script lang="ts">
  import { listings } from '$lib/stores/ListingsStore.js';
  import type { Product } from '$lib/types.ts';

  // Form state
  let product: Omit<Product, 'id'> = { name: '', price: 0, size: '', color: '' };
  let editProduct: Product | null = null;
  let isEditing = false;

  // Add new listing
  function addListing() {
    listings.update(l => [...l, {
		...product, id: Date.now(),
		name: '',
		price: 0,
		size: '',
		color: ''
	}]);
    resetProduct();
  }

  // Remove listing by ID
  function removeListing(id: number) {
    listings.update(l => l.filter(item => item.id !== id));
  }

  // Start editing an existing listing
  function startEdit(item: Product) {
    isEditing = true;
    editProduct = { ...item };
  }

  // Confirm the edit and update the listing
  function confirmEdit() {
    if (!editProduct) return;

    listings.update(items =>
      items.map(item => item.id === editProduct?.id ? editProduct : item)
    );

    isEditing = false;
    editProduct = null;
  }

  // Reset form inputs
  function resetProduct() {
    product = { name: '', price: 0, size: '', color: '' };
  }
</script>

{#if isEditing && editProduct}
  <h3>Edit Listing</h3>
  <input placeholder="Name" bind:value={editProduct.name} />
  <input placeholder="Price" type="number" bind:value={editProduct.price} />
  <input placeholder="Size" bind:value={editProduct.size} />
  <input placeholder="Color" bind:value={editProduct.color} />
  <button on:click={confirmEdit}>Update</button>
{:else}
  <h3>Add Listing</h3>
  <input placeholder="Name" bind:value={product.name} />
  <input placeholder="Price" type="number" bind:value={product.price} />
  <input placeholder="Size" bind:value={product.size} />
  <input placeholder="Color" bind:value={product.color} />
  <button on:click={addListing}>Add</button>
{/if}

<ul>
  {#each $listings as item}
    <li>
      {item.id} - {item.name} - ${item.price} - {item.size} - {item.color}
      <button on:click={() => removeListing(item.id)}>Delete</button>
      <button on:click={() => startEdit(item)}>Edit</button>
    </li>
  {/each}
</ul>

<style>
  button {
    cursor: pointer;
    border: 2px outset black;
    border-color: blue;
    margin: 1rem;
    background-color: cadetblue;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
</style>