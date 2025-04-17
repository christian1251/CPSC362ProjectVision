<script lang="ts">
  import { listings } from '$lib/stores/ListingsStore.js';
  import { cart, type CartItem } from '$lib/stores/Cartstores.js';

  type Product = {
    id: number;
    name: string;
    price: number;
    size: string;
    color: string;
  };

  let searchTerm = '';

  function addToCart(item: Product) {
    cart.update(c => {
      const index = c.findIndex(p => p.id === item.id);
      if (index !== -1) {
        const updated = [...c];
        updated[index].quantity += 1;
        return updated;
      } else {
        return [...c, { ...item, quantity: 1 }];
      }
    });
  }

  $: filteredListings = $listings.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<div class="page-wrapper">
  <input class="search-bar" type="text" placeholder="Search by product name..." bind:value={searchTerm} />

  <div class="gallery">
    {#if filteredListings.length > 0}
      {#each filteredListings as item (item.id)}
        <div class="listing-box">
          <h2>{item.name}</h2>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Color:</strong> {item.color}</p>
          <button on:click={() => addToCart(item)}>Add to Cart</button>
        </div>
      {/each}
    {:else}
      <p class="no-results">No matching listings found.</p>
    {/if}
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  * {
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
  }

  .page-wrapper {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
  }

  .search-bar {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin: 0 auto 2rem auto;
    display: block;
    transition: border-color 0.2s ease;
  }

  .search-bar:focus {
    border-color: dodgerblue;
    outline: none;
  }

  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  .listing-box {
    background: #fff8e1;
    border: 2px solid #e0f7fa;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
    width: 100%;
    max-width: 300px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .listing-box:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .listing-box h2 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
  }

  .listing-box p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #444;
  }

  button {
    display: inline-block;
    margin-top: 1rem;
    background-color: mediumseagreen;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: seagreen;
  }

  .no-results {
    font-size: 1.1rem;
    color: #888;
    text-align: center;
    width: 100%;
  }
</style>
