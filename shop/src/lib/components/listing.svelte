<script lang="ts">
  import { listings } from '$lib/stores/ListingsStore.js';
  import { cart } from '$lib/stores/Cartstores.js';

  type Product = {
    id: number;
    name: string;
    price: number;
    size: string;
    color: string;
  };

  let searchTerm = '';

  // Add a product to the cart
  function addToCart(item: Product) {
    cart.update(c => [...c, { ...item }]); // Simple spread keeps everything clean
  }

  // Filter listings based on search input (reactive)
  $: filteredListings = $listings.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<input type="text" placeholder="Search by name" bind:value={searchTerm} />

<div class="gallery">
  {#if filteredListings.length > 0}
    {#each filteredListings as item (item.id)}
      <div class="listing-box">
        <h1>{item.name}</h1>
        <p>ID: {item.id}</p>
        <p>Price: ${item.price}</p>
        <p>Size: {item.size}</p>
        <p>Color: {item.color}</p>
        <button on:click={() => addToCart(item)}>Add to Cart</button>
      </div>
    {/each}
  {:else}
    <p>No matching listings found.</p>
  {/if}
</div>

<style>
  .gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 10px;
  }

  .listing-box {
    width: 90%;
    max-width: 350px;
    height: auto;
    border-radius: 10px;
    border: 2px outset aqua;
    padding: 1rem;
    margin: 1rem;
    background-color: blanchedalmond;
    transition: transform 0.2s ease;
  }

  .listing-box:hover {
    transform: scale(1.05);
  }

  button {
    cursor: pointer;
    border: 2px outset black;
    border-color: blue;
    margin-top: 1rem;
    background-color: cadetblue;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
  }
</style>
