<script lang="ts" >

    import { listings } from '$lib/stores/ListingsStore.js';
    let id = '', name = '', price = '', size = '', color = '';
    let editName = '', editPrice = '', editSize ='', editColor ='';
    let isEditing = false;
    let editId: number | null = null;
  
    function addListing() {
      listings.update(l => [...l, {
        id: Number(Date.now()),
        name, price: Number(price), size, color
      }]);
      name = price = size = color = '';
    }

   
    function removeListing(id: number) {
      listings.update(l => l.filter(item => item.id !== id));
    
    }
 
    
    /**
	 * @param {{ id: any; name: any; price: any; size: any; color: any; }} item
	 */
    function startEdit(item: { id: any; name: any; price: any; size: any; color: any; }) {
        isEditing = true;
        editId = item.id;
        editName = item.name;
        editPrice = item.price;
        editSize = item.size;
        editColor = item.color;
    }

    function confirmEdit() {
        listings.update(items => 
            items.map(item => item.id === editId
            ? { ...item, name: editName, price: Number(editPrice), size: editSize, color: editColor }
            : item
            )
        );
        isEditing = false;
        editName = editPrice = editSize = editColor = '';
        editId = null;
}
    
  </script>
  {#if isEditing}
    <input placeholder="Name" bind:value={editName}>
    <input placeholder="Price" type="number" bind:value={editPrice}>
    <input placeholder="Size" bind:value={editSize}>
    <input placeholder="Color" bind:value={editColor}>
    <button on:click={confirmEdit}>Update</button>
  {:else}
    <input placeholder="Name" bind:value={name}>
    <input placeholder="Price" type="number" bind:value={price}>
    <input placeholder="Size" bind:value={size}>
    <input placeholder="Color" bind:value={color}>
    <button on:click={addListing}>Add</button>
  {/if}
  <ul>
    {#each $listings as item}
      <li>
        {item.id} - {item.name} - ${item.price} - {item.size} - {item.color}
        <button on:click={() => removeListing(item.id)}>Delete</button>
        <button on:click={() => startEdit(item)}>Edit</button>
      </li>
    {/each}
  </ul>