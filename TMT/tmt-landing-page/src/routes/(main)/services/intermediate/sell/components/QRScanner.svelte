<!-- src/lib/components/QRScanner.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let status: 'ready' | 'scanning' | 'success' | 'error' = 'ready';
    export let scannedCode: string = '';
    
    const dispatch = createEventDispatcher();
    
    function simulateScan() {
      status = 'scanning';
      
      setTimeout(() => {
        // Simulate successful scan
        status = 'success';
        scannedCode = 'MED-' + Math.floor(Math.random() * 1000000);
        
        dispatch('scanComplete', {
          code: scannedCode,
          status: 'success'
        });
      }, 2000);
    }
    
    function resetScanner() {
      status = 'ready';
      scannedCode = '';
      
      dispatch('reset');
    }
  </script>
  
  <div class="flex flex-col items-center space-y-6">
    <div 
      class="w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50"
    >
      {#if status === 'ready'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        <p class="mt-4 text-gray-600">Position the QR code within the frame to scan</p>
      {:else if status === 'scanning'}
        <div class="animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#1A5F7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="mt-4 text-[#1A5F7A]">Scanning QR code...</p>
      {:else if status === 'success'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-[#56C271]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-4 text-[#56C271]">QR code successfully scanned!</p>
        <p class="text-sm text-gray-500 mt-2">{scannedCode}</p>
      {:else if status === 'error'}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-4 text-red-500">Failed to scan QR code. Please try again.</p>
      {/if}
    </div>
    
    <div class="flex space-x-4 w-full">
      <button 
        class="flex-1 px-4 py-3 bg-[#1A5F7A] text-white rounded-lg hover:bg-opacity-90 transition flex items-center justify-center"
        on:click={simulateScan}
        disabled={status === 'scanning'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Scan QR Code
      </button>
      <button 
        class="flex-1 px-4 py-3 bg-[#E2E8F0] text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
        on:click={resetScanner}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
      </button>
    </div>
  </div>