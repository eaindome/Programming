<!-- TransferModal.svelte -->
<script lang="ts">
    import Button from '../../../../dashboard/components/ui/Button.svelte';
    import type { Product } from '../types.ts';
    
    export let product: Product;
    export let onClose = () => {};
    export let onTransfer = (details: { productId: string; quantity: number; destination: string; notes: string }) => {};
    
    // Sample destinations - would likely come from an API
    const destinations = [
      { id: 'DEST-001', name: 'Central Pharmacy' },
      { id: 'DEST-002', name: 'North Branch Outlet' },
      { id: 'DEST-003', name: 'South Medical Center' },
      { id: 'DEST-004', name: 'East Community Clinic' },
      { id: 'DEST-005', name: 'West Hospital Pharmacy' }
    ];
    
    let transferDetails = {
      productId: product.id,
      quantity: 1,
      destination: '',
      notes: ''
    };
    
    $: isValid = transferDetails.quantity > 0 && 
                  transferDetails.quantity <= product.stock && 
                  transferDetails.destination;
    
    function handleSubmit() {
      if (isValid) {
        onTransfer(transferDetails);
      }
    }
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Transfer Inventory</h3>
      </div>
      
      <div class="p-6">
        <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 class="font-medium text-[#1A5F7A]">{product.name}</h4>
          <div class="text-sm text-gray-600">Current Stock: {product.stock} units</div>
          <div class="text-sm text-gray-600">Batch: {product.batchNumber}</div>
        </div>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity to Transfer</label>
            <input 
              type="number" 
              id="quantity" 
              bind:value={transferDetails.quantity}
              min="1"
              max={product.stock}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
            />
            {#if transferDetails.quantity > product.stock}
              <p class="text-red-500 text-xs mt-1">Cannot transfer more than available stock</p>
            {/if}
          </div>
          
          <div>
            <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select 
              id="destination" 
              bind:value={transferDetails.destination}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
            >
              <option value="">Select destination</option>
              {#each destinations as dest}
                <option value={dest.id}>{dest.name}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              id="notes" 
              bind:value={transferDetails.notes}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              placeholder="Add any additional information about this transfer..."
            ></textarea>
          </div>
        </form>
      </div>
      
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
        <Button variant="secondary" on:click={onClose}>Cancel</Button>
        <Button variant="primary" on:click={handleSubmit} disabled={!isValid}>Initiate Transfer</Button>
      </div>
    </div>
  </div>