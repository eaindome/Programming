<script lang="ts">
    import { onMount } from 'svelte';
    
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
  
    // Props
    export let medications: Medication[] = [];
    export let onSelect: (medication: Medication) => void;
    
    // State
    let searchQuery = '';
    let searchResults: Medication[] = [];
    let showResults = false;
    
    // Methods
    function handleSearch() {
      if (searchQuery.length < 2) {
        searchResults = [];
        showResults = false;
        return;
      }
      
      const query = searchQuery.toLowerCase();
      searchResults = medications.filter(med => 
        med.name.toLowerCase().includes(query) || 
        med.manufacturer.toLowerCase().includes(query) ||
        med.batchNumber.toLowerCase().includes(query) ||
        med.qrCode.toLowerCase().includes(query)
      );
      
      showResults = true;
    }
    
    function handleSelect(medication: Medication) {
      onSelect(medication);
      searchQuery = '';
      showResults = false;
    }
    
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        showResults = false;
      }
    }
    
    // Reactive statement to update search results when query changes
    $: if (searchQuery) {
      handleSearch();
    }
    
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
  </script>
  
  <div class="search-container relative">
    <div class="flex">
      <div class="relative flex-grow">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name, manufacturer, batch number..."
          class="block w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
        />
      </div>
    </div>
    
    {#if showResults && searchResults.length > 0}
      <div class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
        {#each searchResults as medication}
          <button
            type="button"
            on:click={() => handleSelect(medication)}
            class="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
          >
            <div>
              <div class="font-medium">{medication.name}</div>
              <div class="text-sm text-gray-500">
                {medication.manufacturer} | Batch: {medication.batchNumber} | Exp: {medication.expiryDate}
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-[#1A5F7A] font-medium">${medication.price.toFixed(2)}</span>
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <span 
                class="ml-3 bg-[#1A5F7A] text-white px-2 py-1 rounded text-xs cursor-pointer"
                on:click|stopPropagation={() => handleSelect(medication)}
              >
                Add
              </span>
            </div>
          </button>
        {/each}
      </div>
    {:else if showResults && searchQuery.length >= 2}
      <div class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-6 text-center text-gray-500">
        No medications found matching "{searchQuery}"
      </div>
    {/if}
  </div>