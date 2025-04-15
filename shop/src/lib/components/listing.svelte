<script>

	import { listings } from '$lib/stores/ListingsStore.js';

</script>


{#each $listings as item}
<div class="listing-box">
    <h1>This is an example of a listing, FEATURES to implement:</h1>
      <li>Identifiers such as {item.id} , {item.price}, {item.price}, etc</li>
    </div>
  {/each}
  
  <style>
    .listing-box {
      border: 2px outset black;
      padding: 1rem;
      margin: 1rem;
      background-color: blanchedalmond;
    }
  
    ul {
      margin-top: 0.5rem;
    }
  
    li {
      margin-bottom: 0.4rem;
    }
  </style>