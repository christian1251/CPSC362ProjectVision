<script lang="ts">
    import { page } from '$app/stores';
    import { listings } from '$lib/stores/ListingsStore.js';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import { derived } from 'svelte/store';
  
    // slug from the URL
    const slug = derived(page, $p => $p.params.slug);
  
    // products that match that category
    const products = derived([listings, slug], ([$l,$s]) =>
      $l.filter(p => p.category === $s)
    );
  </script>
  
  <h1 style="margin-bottom:1rem;text-transform:capitalize">
    {$slug}
  </h1>
  
  <div class="grid">
    {#if $products.length}
      {#each $products as product (product.id)}
        <ProductCard {product}/>
      {/each}
    {:else}
      <p>No products in this category.</p>
    {/if}
  </div>
  
  <style>
  .grid{
    display:grid;
    gap:24px;
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
    justify-items:center;
  }
  </style>
  