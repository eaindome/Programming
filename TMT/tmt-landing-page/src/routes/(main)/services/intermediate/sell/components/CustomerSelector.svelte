<!-- src/lib/components/CustomerSelector.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    
    export let showModal = false;
    
    type Customer = {
      id: string;
      name: string;
      type: 'consumer' | 'retailer';
      email: string;
      phone: string;
    };
    
    export let customers: Customer[] = [];
    export let selectedCustomer: Customer | null = null;
    
    const dispatch = createEventDispatcher();
    
    function selectCustomer(customer: Customer) {
      selectedCustomer = customer;
      showModal = false;
      dispatch('select', customer);
    }
    
    function closeModal() {
      showModal = false;
      dispatch('close');
    }
  </script>
  
  <!-- Selected Customer Display -->
  <div class="mt-4">
    {#if selectedCustomer}
      <div class="bg-gray-50 rounded-md p-3">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-medium text-gray-900">{selectedCustomer.name}</h3>
            <p class="text-xs text-gray-500">
              {selectedCustomer.type === 'retailer' ? 'Retailer' : 'Consumer'}
            </p>
            <p class="text-xs text-gray-500 mt-1">{selectedCustomer.email}</p>
          </div>
          <button 
            class="text-[#1A5F7A] text-xs hover:text-opacity-80"
            on:click={() => showModal = true}
          >
            Change
          </button>
        </div>
      </div>
    {:else}
      <button 
        class="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        on:click={() => showModal = true}
      >
        Select Customer
      </button>
    {/if}
  </div>
  
  <!-- Modal -->
  {#if showModal}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" transition:fade>
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div class="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 class="text-lg font-medium text-gray-900">Select Customer</h2>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button 
            class="text-gray-400 hover:text-gray-500"
            on:click={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="px-6 py-4">
          <div class="space-y-4">
            {#each customers as customer}
              <button 
                class="w-full text-left p-4 border rounded-lg hover:border-[#1A5F7A] transition"
                on:click={() => selectCustomer(customer)}
              >
                <div class="flex justify-between">
                  <div>
                    <h3 class="font-medium text-gray-900">{customer.name}</h3>
                    <p class="text-sm text-gray-500">{customer.email}</p>
                    <p class="text-sm text-gray-500">{customer.phone}</p>
                  </div>
                  <div>
                    <span class="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                      {customer.type === 'retailer' ? 'Retailer' : 'Consumer'}
                    </span>
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}