<script lang="ts">
	import '../app.css';
	import { user } from '../lib/stores/auth.js';
	import { auth } from '../lib/firebase.js';
	import { signOut } from 'firebase/auth';
	import { cart } from '../lib/stores/Cartstores.js';
	import { onMount } from 'svelte';
  
	let menuOpen = false;
	let dropdownEl: HTMLDivElement;
  
	function toggleMenu() {
	  menuOpen = !menuOpen;
	}
  
	function handleLogout() {
	  signOut(auth);
	  menuOpen = false;
	}
  
	const onClickOutside = (e: MouseEvent) => {
	  if (menuOpen && dropdownEl && !dropdownEl.contains(e.target as Node)) {
		menuOpen = false;
	  }
	};
  
	onMount(() => {
	  document.addEventListener('click', onClickOutside);
	  return () => document.removeEventListener('click', onClickOutside);
	});
  
	// Track number of items in cart
	$: cartCount = $cart.reduce((total, item) => total + item.quantity, 0);
  </script>
  
  <header class="navbar">
	<div class="left-nav">
	  <div class="brand">
		<a href="/">StyleSpot</a>
	  </div>
	  <nav class="main-nav">
		<a href="/">Home</a>
		<a href="/admin">Admin</a>
	  </nav>
	</div>
  
	<div class="icon-nav">
	  <div class="dropdown" bind:this={dropdownEl}>
		<button class="icon-link" on:click={toggleMenu} title="Account">
		  <i class="fa-solid fa-user"></i>
		</button>
		{#if menuOpen}
		  <ul class="dropdown-menu">
			{#if $user}
			  <li><button on:click={handleLogout}>Logout</button></li>
			{:else}
			  <li><a href="/login">Login</a></li>
			  <li><a href="/signup">Sign up</a></li>
			{/if}
		  </ul>
		{/if}
	  </div>
  
	  <div class="cart-wrapper">
		<a class="icon-link" href="/cart" title="Cart">
		  <i class="fa-solid fa-shopping-cart"></i>
		  {#if cartCount > 0}
			<div class="cart-badge">{cartCount}</div>
		  {/if}
		</a>
	  </div>
	</div>
  </header>
  
  <main class="container">
	<slot />
  </main>
  
  <style>
	.cart-wrapper {
	  position: relative;
	}
  
	.cart-badge {
	  position: absolute;
	  top: -6px;
	  right: -6px;
	  background-color: mediumseagreen;
	  color: white;
	  border-radius: 9999px;
	  padding: 2px 6px;
	  font-size: 0.7rem;
	  font-weight: bold;
	}
  </style>
  