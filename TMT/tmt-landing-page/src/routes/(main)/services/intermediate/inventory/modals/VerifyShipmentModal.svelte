<!-- VerifyShipmentModal.svelte -->
<script lang="ts">
    import Button from '../../../../dashboard/components/ui/Button.svelte';
    import type { Product } from '../types';
    import { format } from 'date-fns';
    
    export let product: Product;
    export let onClose = () => {};
    export let onVerify = (details: any) => {};
    
    // Sample suppliers - would likely come from an API
    const suppliers = [
      { id: 'SUP-001', name: 'GlobalMed Pharmaceuticals' },
      { id: 'SUP-002', name: 'PharmaTech Industries' },
      { id: 'SUP-003', name: 'MedSupply Solutions' },
      { id: 'SUP-004', name: 'HealthCare Distributors' }
    ];
    
    // Get today's date in YYYY-MM-DD format for the input
    const today = format(new Date(), 'yyyy-MM-dd');
    const futureDate = format(new Date(new Date().setFullYear(new Date().getFullYear() + 2)), 'yyyy-MM-dd');
    
    let verificationDetails = {
      productId: product.id,
      quantity: 100,
      batchNumber: `BTH-${Math.floor(100000 + Math.random() * 900000)}`,
      expiryDate: futureDate,
      supplier: '',
      notes: '',
      receivedDate: today
    };
    
    $: isValid = verificationDetails.quantity > 0 && 
                 verificationDetails.batchNumber && 
                 verificationDetails.expiryDate && 
                 verificationDetails.supplier;
    
    function handleSubmit() {
      if (isValid) {
        onVerify(verificationDetails);
      }
    }
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">Verify Incoming Shipment</h3>
      </div>
      
      <div class="p-6">
        <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 class="font-medium text-[#1A5F7A]">{product.name}</h4>
          <div class="text-sm text-gray-600">Current Stock: {product.stock} units</div>
        </div>
        
        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity Received</label>
              <input 
                type="number" 
                id="quantity" 
                bind:value={verificationDetails.quantity}
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="batchNumber" class="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
              <input 
                type="text" 
                id="batchNumber" 
                bind:value={verificationDetails.batchNumber}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="receivedDate" class="block text-sm font-medium text-gray-700 mb-1">Received Date</label>
              <input 
                type="date" 
                id="receivedDate" 
                bind:value={verificationDetails.receivedDate}
                max={today}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input 
                type="date" 
                id="expiryDate" 
                bind:value={verificationDetails.expiryDate}
                min={today}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              />
            </div>
          </div>
          
          <div>
            <label for="supplier" class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <select 
              id="supplier" 
              bind:value={verificationDetails.supplier}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
            >
              <option value="">Select a supplier</option>
              {#each suppliers as supplier}
                <option value={supplier.id}>{supplier.name}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea 
              id="notes" 
              bind:value={verificationDetails.notes}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
              placeholder="Enter any additional information about this shipment..."
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="outline" on:click={onClose}>Cancel</Button>
            <Button type="submit" disabled={!isValid}>Verify Shipment</Button>
          </div>
        </form>
      </div>
    </div>
  </div>