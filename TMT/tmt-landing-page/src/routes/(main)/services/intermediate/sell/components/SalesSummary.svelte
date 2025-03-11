<script lang="ts">
    // Types
    type Medication = {
      id: string;
      name: string;
      manufacturer: string;
      batchNumber: string;
      expiryDate: string;
      price: number;
      dosage: string;
      qrCode: string;
      verificationStatus: 'verified' | 'unverified' | 'warning';
    };
  
    type SaleItem = {
      medicationId: string;
      medication: Medication;
      quantity: number;
      subtotal: number;
    };
  
    // Props
    export let items: SaleItem[] = [];
    export let total: number = 0;
    
    // Computed values
    $: totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    $: totalVerified = items.filter(item => item.medication.verificationStatus === 'verified').length;
    $: allVerified = totalVerified === items.length && items.length > 0;
  </script>
  
  <div class="sales-summary">
    <div class="mb-4 p-3 bg-gray-50 rounded-md">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Total Items:</span>
        <span class="font-medium">{totalItems}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Unique Products:</span>
        <span class="font-medium">{items.length}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Verification:</span>
        {#if allVerified}
          <span class="text-[#56C271] font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            All Verified
          </span>
        {:else if items.length === 0}
          <span class="text-gray-500">No items</span>
        {:else}
          <span class="text-yellow-500 font-medium">
            {totalVerified}/{items.length} Verified
          </span>
        {/if}
      </div>
    </div>
    
    <div class="border-t border-b border-[#E2E8F0] py-3 mb-4">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Subtotal:</span>
        <span class="font-medium">${total.toFixed(2)}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Tax (8%):</span>
        <span class="font-medium">${(total * 0.08).toFixed(2)}</span>
      </div>
      {#if total >= 100}
        <div class="flex justify-between text-[#56C271]">
          <span>Discount (5%):</span>
          <span>-${(total * 0.05).toFixed(2)}</span>
        </div>
      {/if}
    </div>
    
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold">Total:</span>
      <span class="text-xl font-bold text-[#1A5F7A]">
        ${(total + (total * 0.08) - (total >= 100 ? total * 0.05 : 0)).toFixed(2)}
      </span>
    </div>
    
    {#if items.length > 0}
      <div class="mt-6 text-center">
        <div class="text-sm text-gray-500">
          All transactions secure with TMT blockchain verification
        </div>
        <div class="mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-[#1A5F7A]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    {/if}
  </div>