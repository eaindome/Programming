<script lang="ts">
    export let result: {
      isAuthentic: boolean;
      message: string;
      productDetails: {
        name: string;
        manufacturer: string;
        batchNumber: string;
        expiryDate: string;
        productionDate: string;
      } | null;
    };
</script>
  
<div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <!-- Verification Status Banner -->
    <div class={`p-4 rounded-lg mb-6 flex items-center ${result.isAuthentic ? 'bg-green-100' : 'bg-red-100'}`}>
      {#if result.isAuthentic}
        <div class="h-12 w-12 bg-[#56C271] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-green-800">{result.message}</h2>
          <p class="text-green-700">This medication has been verified as legitimate and has followed the expected supply chain path.</p>
        </div>
      {:else}
        <div class="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-red-800">{result.message}</h2>
          <p class="text-red-700">This medication has failed verification. It may be counterfeit or have deviated from the expected supply chain.</p>
        </div>
      {/if}
    </div>
    
    <!-- Product Details (only shown for authentic medications) -->
    {#if result.isAuthentic && result.productDetails}
      <div>
        <h3 class="text-xl font-semibold text-[#1A5F7A] mb-4">Product Details</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-[#E2E8F0] bg-opacity-30 p-4 rounded-lg">
            <p class="text-gray-500 mb-1">Product Name</p>
            <p class="font-medium">{result.productDetails.name}</p>
          </div>
          <div class="bg-[#E2E8F0] bg-opacity-30 p-4 rounded-lg">
            <p class="text-gray-500 mb-1">Manufacturer</p>
            <p class="font-medium">{result.productDetails.manufacturer}</p>
          </div>
          <div class="bg-[#E2E8F0] bg-opacity-30 p-4 rounded-lg">
            <p class="text-gray-500 mb-1">Batch Number</p>
            <p class="font-medium">{result.productDetails.batchNumber}</p>
          </div>
          <div class="bg-[#E2E8F0] bg-opacity-30 p-4 rounded-lg">
            <p class="text-gray-500 mb-1">Production Date</p>
            <p class="font-medium">{result.productDetails.productionDate}</p>
          </div>
          <div class="bg-[#E2E8F0] bg-opacity-30 p-4 rounded-lg">
            <p class="text-gray-500 mb-1">Expiry Date</p>
            <div class="flex items-center">
              <p class="font-medium">{result.productDetails.expiryDate}</p>
              
              <!-- Check if the expiry date is valid -->
              {#if new Date(result.productDetails.expiryDate) > new Date()}
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Valid
                </span>
              {:else}
                <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Expired
                </span>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {:else if !result.isAuthentic}
      <div class="p-4 border border-red-200 rounded-lg bg-red-50">
        <h3 class="font-semibold text-red-700 mb-2">Verification Failed</h3>
        <p class="text-red-600 mb-4">This medication could not be verified. Please contact your supplier immediately.</p>
        <div class="flex items-center text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>For assistance, please call our hotline at <strong>1-800-TMT-HELP</strong></span>
        </div>
      </div>
    {/if}
</div>