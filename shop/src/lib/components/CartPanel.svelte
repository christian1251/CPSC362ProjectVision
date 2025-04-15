<script>
    import { cart } from "$lib/stores/Cartstores.js"

</script>

<p>This page should add up the total of the listing prices, allow for removal of listing. have a checkout</p>

{#each $cart as item }
<p> This item is in the cart {item.id} - {item.name}</p>
{/each}
