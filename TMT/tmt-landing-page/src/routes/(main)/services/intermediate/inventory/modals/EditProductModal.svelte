<!-- EditProductModal.svelte -->
<script lang="ts">
    import Button from '../../../../dashboard/components/ui/Button.svelte';
    import type { Product } from '../types.ts';

    export let product: Product;
    export let onSave: (product: Product) => void = () => {};
    export let onClose: () => void = () => {};

    
    let editedProduct: Product = { ...product };
    
    function handleSubmit() {
      onSave(editedProduct);
    }
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Edit Product</h3>
      </div>
      
      <div class="p-6">
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input 
              type="text" 
              id="name" 
              bind:value={editedProduct.name} 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text" 
                id="category" 
                bind:value={editedProduct.category} 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="manufacturer" class="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              <input 
                type="text" 
                id="manufacturer" 
                bind:value={editedProduct.manufacturer} 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
              <input 
                type="number" 
                id="stock" 
                bind:value={editedProduct.stock} 
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="minStock" class="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
              <input 
                type="number" 
                id="minStock" 
                bind:value={editedProduct.minStock} 
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="batchNumber" class="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
              <input 
                type="text" 
                id="batchNumber" 
                bind:value={editedProduct.batchNumber} 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input 
                type="date" 
                id="expiryDate" 
                bind:value={editedProduct.expiryDate} 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
          </div>
          
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
            <input 
              type="text" 
              id="location" 
              bind:value={editedProduct.location} 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
            />
          </div>
        </form>
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
        <Button variant="secondary" on:click={onClose}>Cancel</Button>
        <Button variant="primary" on:click={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  </div>