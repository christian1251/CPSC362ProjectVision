<script>
	import { listings } from '$lib/stores/ListingsStore.js';
  import { cart } from '$lib/stores/Cartstores.js'

  let searchTerm = '';  // For searching


  // Add item to cart by updating writable cart
  /**
	 * @param {{ id: any; name: any; price: any; size: any; color: any; }} item
	 */
  function addToCart(item) {
    cart.update(l => [...l, {
        id: item.id,
        name: item.name , 
        price: Number(item.price), 
        size: item.size, 
        color: item.color
      }]);
  }

  // Reactive filtering by search term
  $: filteredListings = $listings.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>

<input type="text" placeholder="Search by name" bind:value={searchTerm}/>

<div class="gallery">
  {#if filteredListings.length > 0}
    {#each filteredListings as item}
      <div class="listing-box">
        <h1>Item ID: {item.id}</h1>
        <p>{item.name}</p>
        <p>${item.price}</p>
        <button on:click={() => addToCart(item)}>Add to cart</button>
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
      height: 300px;
      object-fit: cover;
      border-radius: 10px;
      border: 2px outset black;
      border-color: aqua;
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
      border: 2px outset black ;
      border-color: blue;
      margin: 1rem;
      background-color: cadetblue;
    }
  
    li {
      margin-bottom: 0.4rem;
    }
  </style>