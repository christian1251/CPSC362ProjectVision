<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/Cartstores.js';
	
	let shippingInfo = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'US'
	});
	
	let paymentInfo = $state({
		cardName: '',
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cvv: ''
	});
	
	let cartItems = $state([]);
	let subtotal = $state(0);
	let shippingCost = $state(5.99);
	let taxRate = $state(0.07);
	let taxAmount = $derived(subtotal * taxRate);
	let total = $derived(subtotal + shippingCost + taxAmount);
	
	// Shipping options
	let shippingOptions = [
		{ id: 'standard', name: 'Standard Shipping', price: 5.99, time: '3-5 business days' },
		{ id: 'express', name: 'Express Shipping', price: 12.99, time: '1-2 business days' },
		{ id: 'overnight', name: 'Overnight Shipping', price: 19.99, time: 'Next business day' }
	];
	
	let selectedShipping = $state('standard');
	
	// Initialize cart and calculate totals
	onMount(() => {
		cartItems = [...$cart];
		calculateSubtotal();
	});
	
	$effect(() => {
		const option = shippingOptions.find(opt => opt.id === selectedShipping);
		if (option) {
			shippingCost = option.price;
		}
	});
	
	function calculateSubtotal() {
		subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
	}
	
	function validateShippingInfo() {
		const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
		
		for (const field of requiredFields) {
			if (!shippingInfo[field]) {
				alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
				return false;
			}
		}
		
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(shippingInfo.email)) {
			alert('Please enter a valid email address');
			return false;
		}
		
		return true;
	}
	
	function validatePaymentInfo() {
		const requiredFields = ['cardName', 'cardNumber', 'expMonth', 'expYear', 'cvv'];
		
		for (const field of requiredFields) {
			if (!paymentInfo[field]) {
				alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
				return false;
			}
		}
		
		if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
			alert('Please enter a valid 16-digit card number');
			return false;
		}
		
		if (paymentInfo.cvv.length < 3 || paymentInfo.cvv.length > 4) {
			alert('Please enter a valid CVV');
			return false;
		}
		
		return true;
	}
	
	let currentStep = $state(1);
	
	function goToNextStep() {
		if (currentStep === 1 && validateShippingInfo()) {
			currentStep = 2;
		} else if (currentStep === 2 && validatePaymentInfo()) {
			currentStep = 3;
		}
	}
	
	function goToPreviousStep() {
		if (currentStep > 1) {
			currentStep -= 1;
		}
	}
	
		cart.set([]);
}
</script>

<svelte:head>
	<title>Checkout | Sky Walkers</title>
	<meta name="description" content="Complete your purchase of Sky Walkers premium footwear." />
</svelte:head>

<div class="bg-gray-100 py-8">
	<div class="container mx-auto px-4">
		<h1 class="text-3xl font-bold mb-8">Checkout</h1>
		
		
		
