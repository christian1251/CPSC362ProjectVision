<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/Cartstores.js';

	type Product = {
		id: number;
		name: string;
		price: number;
		size: string;
		color: string;
	};

	type CartItem = Product & { quantity: number };

	type ShippingInfo = {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};

	type PaymentInfo = {
		cardName: string;
		cardNumber: string;
		expMonth: string;
		expYear: string;
		cvv: string;
	};

	// State
	let shippingInfo: ShippingInfo = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'US'
	};

	let paymentInfo: PaymentInfo = {
		cardName: '',
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cvv: ''
	};

	let cartItems: CartItem[] = [];
	let subtotal = 0;
	let shippingCost = 5.99;
	let taxRate = 0.07;

	$: taxAmount = subtotal * taxRate;
	$: total = subtotal + shippingCost + taxAmount;

	let shippingOptions = [
		{ id: 'standard', name: 'Standard Shipping', price: 5.99, time: '3–5 business days' },
		{ id: 'express', name: 'Express Shipping', price: 12.99, time: '1–2 business days' },
		{ id: 'overnight', name: 'Overnight Shipping', price: 19.99, time: 'Next business day' }
	];

	let selectedShipping = 'standard';
	let currentStep = 1;

	onMount(() => {
		const unsubscribe = cart.subscribe((items) => {
			cartItems = [...items];
			calculateSubtotal();
		});
		return unsubscribe;
	});

	$: {
		const option = shippingOptions.find(opt => opt.id === selectedShipping);
		if (option) shippingCost = option.price;
	}

	function calculateSubtotal() {
		subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function validateShippingInfo(): boolean {
		const requiredFields: (keyof ShippingInfo)[] = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
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

	function validatePaymentInfo(): boolean {
		const requiredFields: (keyof PaymentInfo)[] = ['cardName', 'cardNumber', 'expMonth', 'expYear', 'cvv'];
		for (const field of requiredFields) {
			if (!paymentInfo[field]) {
				alert(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
				return false;
			}
		}
		if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
			alert('Card number must be 16 digits');
			return false;
		}
		if (paymentInfo.cvv.length < 3 || paymentInfo.cvv.length > 4) {
			alert('Invalid CVV');
			return false;
		}
		return true;
	}

	function goToNextStep() {
		if (currentStep === 1 && validateShippingInfo()) {
			currentStep = 2;
		} else if (currentStep === 2 && validatePaymentInfo()) {
			currentStep = 3;
		}
	}

	function goToPreviousStep() {
		if (currentStep > 1) currentStep -= 1;
	}

	function placeOrder() {
		alert(' Order placed successfully!');
		cart.set([]); // Clear cart
		currentStep = 1;
	}
</script>

{#if currentStep === 1}
	<h2>Shipping Information</h2>
	<form on:submit|preventDefault={goToNextStep}>
		<input type="text" bind:value={shippingInfo.firstName} placeholder="First Name" required />
		<input type="text" bind:value={shippingInfo.lastName} placeholder="Last Name" required />
		<input type="email" bind:value={shippingInfo.email} placeholder="Email" required />
		<input type="tel" bind:value={shippingInfo.phone} placeholder="Phone" />
		<input type="text" bind:value={shippingInfo.address} placeholder="Address" required />
		<input type="text" bind:value={shippingInfo.city} placeholder="City" required />
		<input type="text" bind:value={shippingInfo.state} placeholder="State" required />
		<input type="text" bind:value={shippingInfo.zipCode} placeholder="ZIP Code" required />
		<input type="text" bind:value={shippingInfo.country} placeholder="Country" required />

		<h3>Shipping Method</h3>
		{#each shippingOptions as option}
			<label>
				<input type="radio" bind:group={selectedShipping} value={option.id} />
				{option.name} — ${option.price.toFixed(2)} ({option.time})
			</label>
		{/each}

		<button type="submit">Next</button>
	</form>
{/if}

{#if currentStep === 2}
	<h2>Payment Information</h2>
	<form on:submit|preventDefault={goToNextStep}>
		<input type="text" bind:value={paymentInfo.cardName} placeholder="Name on Card" required />
		<input type="text" bind:value={paymentInfo.cardNumber} placeholder="Card Number" required />
		<input type="text" bind:value={paymentInfo.expMonth} placeholder="Exp Month (MM)" required />
		<input type="text" bind:value={paymentInfo.expYear} placeholder="Exp Year (YYYY)" required />
		<input type="text" bind:value={paymentInfo.cvv} placeholder="CVV" required />

		<button type="button" on:click={goToPreviousStep}>Back</button>
		<button type="submit">Next</button>
	</form>
{/if}

{#if currentStep === 3}
	<h2>Review & Confirm</h2>
	<h3>Cart Summary</h3>

	{#each cartItems as item (item.id)}
		<p>
			{item.name} — ${item.price.toFixed(2)} × {item.quantity} = 
			<strong>${(item.price * item.quantity).toFixed(2)}</strong>
		</p>
	{/each}

	<p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
	<p><strong>Shipping:</strong> ${shippingCost.toFixed(2)}</p>
	<p><strong>Tax:</strong> ${taxAmount.toFixed(2)}</p>
	<p><strong>Total:</strong> ${total.toFixed(2)}</p>

	<button on:click={goToPreviousStep}>Back</button>
	<button on:click={placeOrder}>Place Order</button>
{/if}
