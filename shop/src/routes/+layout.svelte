<script lang="ts">
	import '../app.css';
	import { user } from '../lib/stores/auth.js';
	import { auth } from '../lib/firebase.js';
	import { signOut } from 'firebase/auth';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
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
  
	let searchTerm = '';
	function handleSearch(e: Event) {
	  e.preventDefault();
	  goto(`/?search=${encodeURIComponent(searchTerm)}`);
	}
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
	  <form class="search-form" on:submit={handleSearch}>
		<input
		  type="text"
		  bind:value={searchTerm}
		  placeholder="Search"
		  aria-label="Search"
		/>
		<button type="submit">
		  <i class="fa-solid fa-magnifying-glass"></i>
		</button>
	  </form>
  
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
  
	  <a class="icon-link" href="/cart" title="Cart">
		<i class="fa-solid fa-shopping-cart"></i>
	  </a>
	</div>
  </header>
  
  <main class="container">
	<slot />
  </main>
  