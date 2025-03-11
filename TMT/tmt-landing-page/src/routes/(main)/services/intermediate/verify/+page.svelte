<script lang="ts">
    import { onMount } from 'svelte';
    import QrScanner from './components/QrScanner.svelte';
    import TransactionHistory from './components/TransactionHistory.svelte';
    import VerificationStatus from './components/VerificationStatus.svelte';
    import { medicationStore } from './stores/medicationStore';
    
    // Local state for input field
    let batchNumber = '';
    
    // Handle QR code result
    function handleQrResult(event: CustomEvent) {
      batchNumber = event.detail;
      medicationStore.toggleScanner();
      handleVerify();
    }
    
    // Handle manual verification
    function handleVerify() {
      if (!batchNumber) return;
      medicationStore.verifyMedication(batchNumber);
    }
    
    // Reset verification
    function resetVerification() {
      batchNumber = '';
      medicationStore.reset();
    }
    
    onMount(() => {
      // Any initialization code if needed
    });
  </script>
  
  <div class="min-h-screen bg-[#F9FAFB]">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold text-[#1A5F7A] mb-2">Verify Medication</h1>
          <p class="text-gray-600">Verify the authenticity and trace the journey of medications through the supply chain</p>
        </div>
        
        {#if !$medicationStore.verificationResult}
          <!-- Verification Input Section -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Manual Entry -->
              <div class="bg-[#E2E8F0] bg-opacity-30 p-6 rounded-lg">
                <h2 class="text-xl font-semibold text-[#1A5F7A] mb-4">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Manual Verification
                  </div>
                </h2>
                <div class="mb-4">
                  <label for="batchNumber" class="block text-gray-700 mb-2">Enter Batch Number / Product Code</label>
                  <input
                    type="text"
                    id="batchNumber"
                    bind:value={batchNumber}
                    placeholder="e.g. TMT12345678"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A5F7A]"
                  />
                </div>
                <button
                  on:click={handleVerify}
                  disabled={!batchNumber || $medicationStore.isVerifying}
                  class="w-full bg-[#1A5F7A] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {#if $medicationStore.isVerifying}
                    <span class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  {:else}
                    Verify Medication
                  {/if}
                </button>
              </div>
              
              <!-- QR Scanner -->
              <div class="bg-[#E2E8F0] bg-opacity-30 p-6 rounded-lg">
                <h2 class="text-xl font-semibold text-[#1A5F7A] mb-4">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    QR Code Scan
                  </div>
                </h2>
                
                {#if $medicationStore.isScanning}
                  <div class="mb-4 relative aspect-square max-w-full">
                    <QrScanner on:result={handleQrResult} />
                    <button
                      on:click={medicationStore.toggleScanner}
                      class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                      aria-label="Close Scanner"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                {:else}
                  <div class="flex flex-col items-center justify-center mb-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-48">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="text-gray-500 text-center">Scan QR code on medication packaging</p>
                  </div>
                {/if}
                
                <button
                  on:click={medicationStore.toggleScanner}
                  class="w-full bg-[#1A5F7A] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-200"
                >
                  {$medicationStore.isScanning ? 'Cancel Scan' : 'Activate Camera'}
                </button>
              </div>
            </div>
            
            <!-- Demonstration Helper -->
            <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-blue-800">Demo Info</h3>
                  <div class="mt-2 text-sm text-blue-700">
                    <p>For testing, use batch number "TMT12345678" for a verified authentic medication. Any other value has a 70% chance of being authentic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {:else}
          <!-- Verification Results -->
          <VerificationStatus result={$medicationStore.verificationResult} />
          
          {#if $medicationStore.verificationResult.isAuthentic && $medicationStore.verificationResult.transactionHistory}
            <TransactionHistory history={$medicationStore.verificationResult.transactionHistory} />
          {/if}
          
          <div class="flex justify-center mt-8">
            <button
              on:click={resetVerification}
              class="bg-[#1A5F7A] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Verify Another Medication
            </button>
          </div>
        {/if}
      </div>
    </div>
</div>