<script lang="ts">
	/* imports */
	import { listings } from '$lib/stores/ListingsStore.js';
	import ProductCard      from '$lib/components/ProductCard.svelte';

	/* logic */
	let searchTerm = '';

	$: filtered = $listings.filter(p =>
		p.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<div class="wrapper">
	<input  class="search"
	        placeholder="Search products…"
	        bind:value={searchTerm} />

	<div class="grid">
		{#if filtered.length}
			{#each filtered as product (product.id)}
				<ProductCard {product}/>
			{/each}
		{:else}
			<p class="no-results">No matching products.</p>
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
	*{box-sizing:border-box;font-family:'Inter',sans-serif;}

	.wrapper{max-width:1200px;margin:0 auto;padding:2rem 1rem;}
	.search{
		width:100%;max-width:420px;margin:0 auto 2rem;display:block;
		padding:.75rem 1rem;font-size:1rem;border:1px solid #ccc;border-radius:8px;
	}
	.search:focus{border-color:dodgerblue;outline:none;}

	.grid{
		display:grid;
		gap:24px;
		grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
		justify-items:center;
	}
	.no-results{grid-column:1/-1;text-align:center;color:#666;font-size:1.1rem;}
</style>
