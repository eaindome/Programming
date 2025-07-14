<script lang="ts">
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { writable } from 'svelte/store';
    
    // Stores for cart and search functionality
    interface CartItem {
      id: string;
      name: string;
      manufacturer: string;
      category: string;
      batchNumber: string;
      expiryDate: string;
      stockQuantity: number;
      price: number;
      unitSize: string;
      imageUrl: string;
      description: string;
      quantity: number;
    }
    
    const cart = writable<CartItem[]>([]);
    const searchQuery = writable('');
    const selectedCategory = writable('all');
    
    // Mock data for available drugs
    let drugs = [
      {
        id: '001',
        name: 'Paracetamol 500mg',
        manufacturer: 'PharmaCorp',
        category: 'pain-relief',
        batchNumber: 'PCM22103A',
        expiryDate: '2025-06-15',
        stockQuantity: 500,
        price: 12.50,
        unitSize: '100 tablets',
        imageUrl: '/api/placeholder/80/80',
        description: 'For the temporary relief of fever, headaches, and minor aches and pains.'
      },
      {
        id: '002',
        name: 'Amoxicillin 250mg',
        manufacturer: 'BioMedicals',
        category: 'antibiotics',
        batchNumber: 'AMX21089B',
        expiryDate: '2025-03-22',
        stockQuantity: 200,
        price: 25.75,
        unitSize: '50 capsules',
        imageUrl: '/api/placeholder/80/80',
        description: 'Antibiotic used to treat a number of bacterial infections.'
      },
      {
        id: '003',
        name: 'Omeprazole 20mg',
        manufacturer: 'HealthPharm',
        category: 'gastrointestinal',
        batchNumber: 'OMP22056C',
        expiryDate: '2025-08-10',
        stockQuantity: 350,
        price: 18.99,
        unitSize: '30 tablets',
        imageUrl: '/api/placeholder/80/80',
        description: 'Used to treat certain stomach and esophagus problems such as acid reflux and ulcers.'
      },
      {
        id: '004',
        name: 'Metformin 500mg',
        manufacturer: 'DiabeCare',
        category: 'diabetes',
        batchNumber: 'MTF21198D',
        expiryDate: '2025-04-30',
        stockQuantity: 280,
        price: 15.50,
        unitSize: '60 tablets',
        imageUrl: '/api/placeholder/80/80',
        description: 'Oral medication that helps control blood sugar levels in patients with type 2 diabetes.'
      },
      {
        id: '005',
        name: 'Cetirizine 10mg',
        manufacturer: 'AllergyRelief',
        category: 'allergy',
        batchNumber: 'CET22042E',
        expiryDate: '2025-09-18',
        stockQuantity: 420,
        price: 9.99,
        unitSize: '30 tablets',
        imageUrl: '/api/placeholder/80/80',
        description: 'Antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching, and sneezing.'
      },
      {
        id: '006',
        name: 'Salbutamol Inhaler',
        manufacturer: 'RespiCare',
        category: 'respiratory',
        batchNumber: 'SLB21157F',
        expiryDate: '2025-02-28',
        stockQuantity: 150,
        price: 22.75,
        unitSize: '200 doses',
        imageUrl: '/api/placeholder/80/80',
        description: 'Bronchodilator that helps open up the airways in the lungs, making it easier to breathe.'
      },
    ];
    
    // Categories for filtering
    const categories = [
      { id: 'all', name: 'All Categories' },
      { id: 'antibiotics', name: 'Antibiotics' },
      { id: 'pain-relief', name: 'Pain Relief' },
      { id: 'gastrointestinal', name: 'Gastrointestinal' },
      { id: 'diabetes', name: 'Diabetes Management' },
      { id: 'allergy', name: 'Allergy Medication' },
      { id: 'respiratory', name: 'Respiratory Care' },
    ];
    
    // UI state variables
    let loading = true;
    let selectedDrug: typeof drugs[0] | null = null;
    let showDrugDetail = false;
    let showCart = false;
    let detailsQuantity = 1;
    let filteredDrugs: typeof drugs = [];
    
    // Initialize page
    onMount(() => {
      setTimeout(() => {
        loading = false;
        filterDrugs();
      }, 800);
      
      // Initialize cart from localStorage if exists
      const savedCart = localStorage.getItem('drugCart');
      if (savedCart) {
        cart.set(JSON.parse(savedCart));
      }
      
      // Save cart to localStorage when it changes
      cart.subscribe(value => {
        localStorage.setItem('drugCart', JSON.stringify(value));
      });
    });
    
    // Filter drugs based on search query and category
    function filterDrugs() {
      let query = $searchQuery.toLowerCase();
      let category = $selectedCategory;
      
      filteredDrugs = drugs.filter(drug => {
        const matchesQuery = drug.name.toLowerCase().includes(query) || 
                             drug.manufacturer.toLowerCase().includes(query) ||
                             drug.batchNumber.toLowerCase().includes(query);
        
        const matchesCategory = category === 'all' || drug.category === category;
        
        return matchesQuery && matchesCategory;
      });
    }
    
    // Watch for changes to search query or category
    $: {
      if (!loading) {
        filterDrugs();
      }
    }
    
    function viewDrugDetails(drug: typeof drugs[0]) {
      selectedDrug = drug;
      detailsQuantity = 1;
      showDrugDetail = true;
    }
    
    function closeDrugDetails() {
      showDrugDetail = false;
      setTimeout(() => {
        selectedDrug = null;
      }, 300);
    }
    
    function addToCart(drug: typeof drugs[0], quantity: number) {
      cart.update(items => {
        const existingItem = items.find(item => item.id === drug.id);
        
        if (existingItem) {
          return items.map(item => 
            item.id === drug.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        } else {
          return [...items, { ...drug, quantity }];
        }
      });
      
      if (showDrugDetail) {
        closeDrugDetails();
      }
      
      // Show notification or feedback
      alert(`Added ${quantity} ${drug.name} to cart`);
    }
    
    function removeFromCart(drugId: string) {
      cart.update(items => items.filter(item => item.id !== drugId));
    }
    
    function updateCartQuantity(drugId: string, newQuantity: number) {
      if (newQuantity < 1) return;
      
      cart.update(items => 
        items.map(item => 
          item.id === drugId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    }
    
    function getCartTotal() {
      let total = 0;
      $cart.forEach(item => {
        total += item.price * item.quantity;
      });
      return total.toFixed(2);
    }
    
    function checkout() {
      // This would connect to your payment processing and order system
      alert('Proceeding to checkout...');
      // Clear cart after successful checkout
      cart.set([]);
    }
  </script>
  
  <div class="bg-[#F9FAFB] min-h-screen">
    <!-- Page header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-[#1A5F7A]">Purchase Drugs</h1>
          
          <button 
            class="flex items-center bg-[#1A5F7A] text-white px-4 py-2 rounded-lg hover:bg-[#164d63] transition-colors relative"
            on:click={() => showCart = !showCart}
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Cart
            {#if $cart.length > 0}
              <span class="absolute -top-2 -right-2 bg-[#56C271] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {$cart.length}
              </span>
            {/if}
          </button>
        </div>
      </div>
    </header>
    
    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Search and filter -->
      <div class="bg-white rounded-lg shadow mb-6 p-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search drugs by name, manufacturer, or batch..." 
                class="w-full pl-10 pr-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
                bind:value={$searchQuery}
              />
              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="md:w-64">
            <select 
              class="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
              bind:value={$selectedCategory}
            >
              {#each categories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      
      <!-- Loading state -->
      {#if loading}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each Array(6) as _}
            <div class="bg-white rounded-lg shadow p-4 animate-pulse">
              <div class="flex items-start">
                <div class="bg-gray-200 w-20 h-20 rounded"></div>
                <div class="ml-4 flex-1">
                  <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              <div class="mt-4">
                <div class="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <!-- Drug list -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#if filteredDrugs.length === 0}
            <div class="col-span-full bg-white rounded-lg shadow p-6 text-center">
              <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900">No drugs found</h3>
              <p class="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          {:else}
            {#each filteredDrugs as drug, i}
              <div 
                class="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                in:fly={{y: 20, delay: i * 50, duration: 200}}
              >
                <div class="p-4">
                  <div class="flex items-start">
                    <img src={drug.imageUrl} alt={drug.name} class="w-20 h-20 object-cover rounded-md bg-[#E2E8F0]" />
                    <div class="ml-4">
                      <h3 class="font-medium text-lg text-[#1A5F7A]">{drug.name}</h3>
                      <p class="text-sm text-gray-600">{drug.manufacturer}</p>
                      <p class="text-sm text-gray-500">Batch: {drug.batchNumber}</p>
                      <div class="mt-1 text-[#56C271] font-medium">${drug.price.toFixed(2)} / {drug.unitSize}</div>
                    </div>
                  </div>
                  
                  <div class="mt-4 flex space-x-2">
                    <button 
                      class="flex-1 bg-[#E2E8F0] hover:bg-gray-200 text-[#1A5F7A] px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                      on:click={() => viewDrugDetails(drug)}
                    >
                      View Details
                    </button>
                    <button 
                      class="flex-1 bg-[#1A5F7A] hover:bg-[#164d63] text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                      on:click={() => addToCart(drug, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      {/if}
    </main>
    
    <!-- Drug details modal -->
    {#if showDrugDetail && selectedDrug}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" transition:fade={{ duration: 200 }}>
        <div 
          class="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
          transition:fly={{ y: 20, duration: 200 }}
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <h2 class="text-2xl font-semibold text-[#1A5F7A]">{selectedDrug.name}</h2>
              <button class="text-gray-400 hover:text-gray-500" on:click={closeDrugDetails}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="md:col-span-1">
                <img src={selectedDrug.imageUrl} alt={selectedDrug.name} class="w-full h-40 object-cover rounded-lg bg-[#E2E8F0]" />
                
                <div class="mt-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E2E8F0]">
                  <div class="text-xl font-semibold text-[#1A5F7A]">${selectedDrug.price.toFixed(2)}</div>
                  <div class="text-sm text-gray-500">Per {selectedDrug.unitSize}</div>
                  
                  <div class="mt-3 flex items-center">
                    <button 
                      class="w-8 h-8 flex items-center justify-center bg-[#E2E8F0] rounded-l-lg text-gray-600"
                      on:click={() => detailsQuantity > 1 && (detailsQuantity -= 1)}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      class="w-12 h-8 text-center border-y border-[#E2E8F0]"
                      bind:value={detailsQuantity}
                    />
                    <button 
                      class="w-8 h-8 flex items-center justify-center bg-[#E2E8F0] rounded-r-lg text-gray-600"
                      on:click={() => detailsQuantity += 1}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <button 
                    class="mt-3 w-full bg-[#1A5F7A] hover:bg-[#164d63] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    on:click={() => selectedDrug && addToCart(selectedDrug, detailsQuantity)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div class="md:col-span-2">
                <div class="prose">
                  <p>{selectedDrug.description}</p>
                </div>
                
                <div class="mt-4 grid grid-cols-2 gap-4">
                  <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E2E8F0]">
                    <div class="text-sm font-medium text-gray-500">Manufacturer</div>
                    <div class="font-medium">{selectedDrug.manufacturer}</div>
                  </div>
                  
                  <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E2E8F0]">
                    <div class="text-sm font-medium text-gray-500">Batch Number</div>
                    <div class="font-medium">{selectedDrug.batchNumber}</div>
                  </div>
                  
                  <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E2E8F0]">
                    <div class="text-sm font-medium text-gray-500">Expiry Date</div>
                    <div class="font-medium">{new Date(selectedDrug.expiryDate).toLocaleDateString()}</div>
                  </div>
                  
                  <div class="p-3 bg-[#F9FAFB] rounded-lg border border-[#E2E8F0]">
                    <div class="text-sm font-medium text-gray-500">Available Quantity</div>
                    <div class="font-medium">{selectedDrug.stockQuantity} units</div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <button 
                    class="bg-[#56C271] hover:bg-[#4aad62] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Verify Authenticity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Shopping cart sidebar -->
    {#if showCart}
      <div class="fixed inset-0 z-50 overflow-hidden" transition:fade={{ duration: 150 }}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="absolute inset-0 bg-black bg-opacity-50" on:click={() => showCart = false}></div>
        
        <div class="absolute inset-y-0 right-0 max-w-full flex">
          <div 
            class="relative w-screen max-w-md bg-white shadow-xl flex flex-col"
            transition:fly={{ x: 300, duration: 200 }}
          >
            <div class="flex-1 overflow-y-auto">
              <div class="p-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-xl font-semibold text-[#1A5F7A]">Your Cart</h2>
                  <button class="text-gray-400 hover:text-gray-500" on:click={() => showCart = false}>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div class="mt-8">
                  {#if $cart.length === 0}
                    <div class="text-center py-8">
                      <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      <h3 class="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                      <p class="mt-1 text-gray-500">Start adding products to your cart to see them here.</p>
                    </div>
                  {:else}
                    <div class="flow-root">
                      <ul class="-my-6 divide-y divide-gray-200">
                        {#each $cart as item}
                          <li class="py-6 flex" in:fly={{ y: 10, duration: 150 }}>
                            <div class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                              <img src={item.imageUrl} alt={item.name} class="w-full h-full object-center object-cover" />
                            </div>
                            
                            <div class="ml-4 flex-1 flex flex-col">
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p class="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{item.manufacturer}</p>
                              </div>
                              
                              <div class="flex-1 flex items-end justify-between text-sm">
                                <div class="flex items-center border border-gray-300 rounded">
                                  <button 
                                    class="px-2 py-1 text-gray-600"
                                    on:click={() => updateCartQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <span class="px-3 text-gray-900">{item.quantity}</span>
                                  <button 
                                    class="px-2 py-1 text-gray-600"
                                    on:click={() => updateCartQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                
                                <button 
                                  type="button" 
                                  class="font-medium text-[#1A5F7A] hover:text-[#164d63]"
                                  on:click={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
            
            {#if $cart.length > 0}
              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${getCartTotal()}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <button 
                    class="w-full bg-[#1A5F7A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#164d63] transition-colors"
                    on:click={checkout}
                  >
                    Checkout
                  </button>
                </div>
                <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or
                    <button 
                      type="button" 
                      class="font-medium text-[#1A5F7A] hover:text-[#164d63]"
                      on:click={() => showCart = false}
                    >
                      Continue Shopping
                    </button>
                  </p>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>