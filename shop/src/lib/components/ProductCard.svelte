<script lang="ts">
    export let product;
    import { cart } from '$lib/stores/Cartstores.js';
  
    const add = () =>
      cart.update(arr => {
        const idx = arr.findIndex(p => p.id === product.id);
        if (idx !== -1) {
          const copy = [...arr];
          copy[idx].quantity += 1;
          return copy;
        }
        return [...arr, { ...product, quantity: 1 }];
      });
  </script>
  
  <div class="card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p class="price">${product.price}</p>
    <button on:click={add}>Add to Cart</button>
  </div>
  
  <style>
  .card{
    width:240px;
    background:#fffbea;
    border-radius:8px;
    padding:1rem;
    box-shadow:0 2px 6px rgba(0,0,0,.08);
    text-align:center;
    transition:transform .15s;
  }
  .card:hover{transform:translateY(-4px);}
  .card img{
    width:100%;height:180px;object-fit:cover;border-radius:6px;
  }
  .price{margin:.5rem 0 1rem;font-weight:600;}
  button{
    background:#28a745;border:none;color:#fff;
    padding:.5rem 1rem;border-radius:4px;cursor:pointer;
  }
  button:hover{background:#1e7e34;}
  </style>
  