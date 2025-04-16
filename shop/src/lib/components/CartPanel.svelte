<script>
    import { cart } from "$lib/stores/Cartstores.js"
	import { ssrImportMetaKey } from "vite/module-runner";

    $: total = $cart.reduce((sum, item) => sum + item.price, 0);


</script>

<p>This page should add up the total of the listing prices, allow for removal of listing. have a checkout</p>

{#each $cart as item }
<p> This item is in the cart {item.id} - {item.name} - ${item.price}</p>
{/each}


<p>Total: ${total}</p>
<button>Checkout</button>

<style>
     button {
      cursor: pointer;
      border: 2px outset black ;
      border-color: blue;
      margin: 1rem;
      background-color: cadetblue;
    }
</style>