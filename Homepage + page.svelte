<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	
	// Featured products data
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string;
		category: string;
	}
	
	// Sample data - in a real app, this would come from an API or store
	let featuredProducts = $state<Product[]>([
		{
			id: '1',
			name: 'Cloud Walker Pro',
			price: 129.99,
			image: '/images/product-1.jpg',
			category: 'Running'
		},
		{
			id: '2',
			name: 'Nimbus Lite',
			price: 89.99,
			image: '/images/product-2.jpg',
			category: 'Casual'
		},
		{
			id: '3',
			name: 'Air Strider X',
			price: 159.99,
			image: '/images/product-3.jpg',
			category: 'Athletic'
		},
		{
			id: '4',
			name: 'Sky Bouncer Elite',
			price: 119.99,
			image: '/images/product-4.jpg',
			category: 'Basketball'
		}
	]);
	
	// Function to add item to cart
	function addToCart(product: Product) {
		// In a real app, this would dispatch to a cart store
		alert(`Added ${product.name} to cart!`);
		
		// For demo purposes, we can simulate adding to cart by updating the layout's cartItemCount
		// In a real app, this would use a store
		const layoutElement = document.querySelector('body > div');
		if (layoutElement) {
			const event = new CustomEvent('add-to-cart');
			layoutElement.dispatchEvent(event);
		}
	}
	
	// Categories for quick navigation
	const categories = [
		{ name: 'Running', icon: '🏃‍♂️' },
		{ name: 'Casual', icon: '👟' },
		{ name: 'Athletic', icon: '🏆' },
		{ name: 'Basketball', icon: '🏀' },
		{ name: 'Hiking', icon: '🥾' },
		{ name: 'Sandals', icon: '🩴' }
	];
	
	let searchQuery = $state('');
	
	function handleSearch() {
		if (searchQuery.trim()) {
			// In a real app, this would navigate to search results
			window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
		}
	}
	
	// For the newsletter subscription
	let email = $state('');
	let subscribed = $state(false);
	
	function subscribeToNewsletter() {
		if (email && email.includes('@')) {
			subscribed = true;
			email = '';
			// In a real app, this would send the email to a server
		}
	}
</script>

<svelte:head>
	<title>Sky Walkers | Walk on Air</title>
	<meta name="description" content="Sky Walkers offers premium footwear that makes you feel like you're walking on air. Shop the latest styles of athletic, casual, and fashion shoes." />
</svelte:head>

<!-- Hero section -->
<section class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
	<div class="container mx-auto px-4 py-20">
		<div class="flex flex-col md:flex-row items-center">
			<div class="md:w-1/2 mb-8 md:mb-0">
				<h1 class="text-4xl md:text-5xl font-bold mb-4">Walk on Air with Sky Walkers</h1>
				<p class="text-xl mb-6">Discover our premium collection of footwear designed for ultimate comfort and style</p>
				<div class="flex space-x-4">
					<a href="/products" class="bg-white text-sky-600 px-6 py-3 rounded-md font-medium hover:bg-sky-100">
						Shop Now
					</a>
					<a href="/about" class="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10">
						Learn More
					</a>
				</div>
			</div>
			<div class="md:w-1/2 flex justify-center">
				<img src="/images/hero-shoes.png" alt="Featured Sky Walkers shoes" class="max-w-full h-auto rounded-lg shadow-lg" />
			</div>
		</div>
	</div>
</section>

<!-- Search section -->
<section class="bg-gray-100 py-6">
	<div class="container mx-auto px-4">
		<div class="max-w-2xl mx-auto">
			<form on:submit|preventDefault={handleSearch} class="flex">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search for shoes..."
					class="flex-grow px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500"
				/>
				<button
					type="submit"
					class="bg-sky-600 text-white px-6 py-3 rounded-r-md hover:bg-sky-700 transition duration-200"
				>
					Search
				</button>
			</form>
		</div>
	</div>
</section>

<!-- Categories -->
<section class="py-12">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-10">Shop by Category</h2>
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
			{#each categories as category}
				<a href={`/products?category=${category.name}`} class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-200">
					<div class="text-4xl mb-2">{category.icon}</div>
					<h3 class="font-medium">{category.name}</h3>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Products -->
<section class="py-12 bg-gray-50">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-2">Featured Products</h2>
		<p class="text-gray-600 text-center mb-10">Our most popular styles that are flying off the shelves</p>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each featuredProducts as product}
				<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
					<div class="h-64 bg-gray-200 relative">
						<img
							src={product.image}
							alt={product.name}
							class="w-full h-full object-cover"
							onerror="this.src='/images/placeholder.jpg'"
						/>
						<div class="absolute top-2 right-2 bg-sky-600 text-white px-2 py-1 rounded text-sm">
							{product.category}
						</div>
					</div>
					<div class="p-4">
						<h3 class="font-bold text-lg mb-2">{product.name}</h3>
						<div class="flex justify-between items-center">
							<span class="text-lg font-semibold">${product.price.toFixed(2)}</span>
							<button
								on:click={() => addToCart(product)}
								class="bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition duration-200"
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="text-center mt-10">
			<a href="/products" class="inline-block bg-sky-600 text-white px-6 py-3 rounded-md font-medium hover:bg-sky-700 transition duration-200">
				View All Products
			</a>
		</div>
	</div>
</section>

<!-- Testimonials -->
<section class="py-16 bg-gradient-to-r from-sky-400 to-sky-600 text-white">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="bg-white bg-opacity-10 p-6 rounded-lg">
				<div class="flex items-center mb-4">
					<div class="text-yellow-300 flex">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					</div>
				</div>
				<p class="mb-4">"These are the most comfortable shoes I've ever owned! It really feels like walking on clouds. Highly recommend for anyone who spends a lot of time on their feet."</p>
				<div class="font-bold">Sarah J.</div>
			</div>
			
			<div class="bg-white bg-opacity-10 p-6 rounded-lg">
				<div class="flex items-center mb-4">
					<div class="text-yellow-300 flex">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-
