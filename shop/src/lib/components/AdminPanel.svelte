<script lang="ts">
	import { listings } from '$lib/stores/ListingsStore.js';
	import type { Product } from '$lib/types.ts';

	/* ---------- local form state ---------- */
	let form: Omit<Product, 'id'> = {
		name: '',
		price: 0,
		size: '',
		color: '',
		image: ''
	};

	let editing: Product | null = null;

	/* ---------- helpers ---------- */
	const PLACEHOLDER = '/images/placeholder.webp';

	function resetForm() {
		form = { name: '', price: 0, size: '', color: '', image: '' };
		editing = null;
	}

	function save() {
		// Use placeholder image if none given
		const img = (editing ? editing.image : form.image) || PLACEHOLDER;

		if (editing) {
			// update existing
			listings.update(arr =>
				arr.map(i =>
					i.id === editing!.id ? { ...editing!, ...form, image: img } : i
				)
			);
		} else {
			// add new
			listings.update(arr => [
				...arr,
				{ id: Date.now(), ...form, image: img }
			]);
		}
		resetForm();
	}

	function edit(item: Product) {
		editing = { ...item };
		form = { ...item }; // preload inputs
	}

	function remove(id: number) {
		listings.update(arr => arr.filter(i => i.id !== id));
		if (editing?.id === id) resetForm();
	}
</script>

<h2>Add&nbsp;/ Edit Listing</h2>

<div class="form">
	<input placeholder="Name"     bind:value={form.name} />
	<input placeholder="Price"    type="number" min="0" bind:value={form.price} />
	<input placeholder="Size"     bind:value={form.size} />
	<input placeholder="Color"    bind:value={form.color} />
	<input placeholder="Image URL (optional)" bind:value={form.image} />

	<button on:click={save}>
		{editing ? 'Update' : 'Add'}
	</button>
	{#if editing}<button class="cancel" on:click={resetForm}>Cancel</button>{/if}
</div>

<hr />

<h2>Current Listings</h2>

<table>
	<thead>
		<tr>
			<th>Preview</th><th>Name</th><th>Price&nbsp;($)</th>
			<th>Size</th><th>Color</th><th style="width:140px">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each $listings as item}
			<tr>
				<td><img src={item.image || PLACEHOLDER} alt="" /></td>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>{item.size}</td>
				<td>{item.color}</td>
				<td class="actions">
					<button class="small danger"  on:click={() => remove(item.id)}>Del</button>
					<button class="small"          on:click={() => edit(item)}>Edit</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
/* simple utility colours that match existing palette */
:root{
	--green:#28a745;
	--green-dark:#1e7e34;
	--red:#c0392b;
}

h2{margin-top:2rem;margin-bottom:.75rem}

/* ------------- form row ------------- */
.form{
	display:grid;
	grid-template-columns:repeat(auto-fill,minmax(160px,1fr)) 110px auto;
	gap:12px;
	margin-bottom:1.5rem;
}
.form input{
	padding:.5rem .6rem;border:1px solid #ccc;border-radius:6px;
}
.form button{
	background:var(--green);color:#fff;border:none;border-radius:6px;
	padding:.55rem 1.2rem;cursor:pointer;font-weight:600;
}
.form button:hover{background:var(--green-dark)}
.form .cancel{background:#6c757d}
.form .cancel:hover{background:#5a6268}

/* ------------- table ------------- */
table{
	width:100%;border-collapse:collapse;font-size:.95rem;
	box-shadow:0 2px 6px rgba(0,0,0,.06);
}
th,td{padding:.6rem .75rem;text-align:left}
thead{background:#003220;color:#fff}
tbody tr:nth-child(odd){background:#fffdf2}
tbody tr:hover{background:#fff8e1}

td img{
	width:48px;height:48px;object-fit:cover;border-radius:4px;
}
.actions{display:flex;gap:8px}
button.small{
	padding:.3rem .75rem;font-size:.8rem;border:none;border-radius:4px;
	background:var(--green);color:#fff;cursor:pointer
}
button.small:hover{background:var(--green-dark)}
button.danger{background:var(--red)}
button.danger:hover{background:#96281b}
</style>
