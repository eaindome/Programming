<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '../../../dashboard/components/layouts/Card.svelte';
  import Button from '../../../dashboard/components/ui/Button.svelte';
  import Badge from '../../../dashboard/components/ui/Badge.svelte';
  
  import EditProductModal from './modals/EditProductModal.svelte';
  
  type Product = {
      id: string;
      name: string;
      category: string;
      batchNumber: string;
      manufacturer: string;
      stock: number;
      expiryDate: string;
      location: string;
      minStock: number;
  };

  // Mock inventory data - replace with actual API calls
  let inventory: Product[] = [
    {
      id: 'MED-001',
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      batchNumber: 'BTH-123456',
      manufacturer: 'AstraPharm Inc.',
      stock: 1200,
      expiryDate: '2023-12-31',
      location: 'Rack A-12',
      minStock: 100
    },
    // ... other inventory items
  ];
  
  let searchQuery = '';
  let categoryFilter = 'all';
  let expiryFilter = 'all'; // 'all', 'valid', 'expiring', 'expired'
  
  $: filteredInventory = inventory
    .filter(item => {
      // Search filter
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }
      
      // Expiry filter
      const expiryDays = calculateExpiryDays(item.expiryDate);
      if (expiryFilter === 'valid' && expiryDays < 30) {
        return false;
      } else if (expiryFilter === 'expiring' && (expiryDays >= 30 || expiryDays < 0)) {
        return false;
      } else if (expiryFilter === 'expired' && expiryDays >= 0) {
        return false;
      }
      
      return true;
    });

  // Get unique categories for the filter
  $: categories = [...new Set(inventory.map(item => item.category))];
  
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  
  function calculateExpiryDays(expiryDate: string): number {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function getExpiryBadge(expiryDays: number): {type: 'success' | 'warning' | 'error', text: string} {
    if (expiryDays < 0) {
      return { type: 'error', text: 'Expired' };
    } else if (expiryDays < 30) {
      return { type: 'warning', text: 'Expiring Soon' };
    } else {
      return { type: 'success', text: 'Valid' };
    }
  }
  
  let showEditModal = false;
  let selectedProduct: Product | null = null;
  
  function openEditModal(product: Product) {
    selectedProduct = product;
    showEditModal = true;
  }

  function handleProductUpdate(updatedProduct: Product) {
    const index = inventory.findIndex(item => item.id === updatedProduct.id);
    if (index !== -1) {
      inventory[index] = updatedProduct;
    }
    showEditModal = false;
  }

  function removeDrug(productId: string) {
    if (confirm('Are you sure you want to remove this drug from inventory?')) {
      inventory = inventory.filter(item => item.id !== productId);
    }
  }
</script>

<div class="p-6 bg-[#F9FAFB] min-h-screen">
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-800">Inventory Management</h1>
    <p class="text-gray-500 mt-1">View and manage your medication inventory</p>
  </div>
  
  <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
    <div class="flex-1 flex flex-wrap gap-4 min-w-0">
      <!-- Search Bar -->
      <div class="relative w-full md:w-64">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name or batch..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      <!-- Category Filter -->
      <select 
        bind:value={categoryFilter}
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
      >
        <option value="all">All Categories</option>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
      
      <!-- Expiry Filter -->
      <select 
        bind:value={expiryFilter}
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
      >
        <option value="all">All Expiry Status</option>
        <option value="valid">Valid</option>
        <option value="expiring">Expiring Soon</option>
        <option value="expired">Expired</option>
      </select>
    </div>
    
    <div>
      <Button variant="primary" icon="plus">Add Product</Button>
    </div>
  </div>
  
  <Card padding={false}>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th class="px-4 py-3">Product Name</th>
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3">Batch Number</th>
            <th class="px-4 py-3">Stock</th>
            <th class="px-4 py-3">Expiry Date</th>
            <th class="px-4 py-3">Location</th>
            <th class="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredInventory as item}
            {@const expiryDays = calculateExpiryDays(item.expiryDate)}
            {@const expiryStatus = getExpiryBadge(expiryDays)}
            <tr>
              <td class="px-4 py-4 text-sm font-medium text-gray-900">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2 text-[#1A5F7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <div>
                    <div>{item.name}</div>
                    <div class="text-xs text-gray-500">{item.id}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-500">{item.category}</td>
              <td class="px-4 py-4 text-sm text-gray-500">{item.batchNumber}</td>
              <td class="px-4 py-4 text-sm text-gray-500">{item.stock} units</td>
              <td class="px-4 py-4 text-sm">
                <div>{formatDate(item.expiryDate)}</div>
                <Badge type={expiryStatus.type} text={expiryStatus.text} />
              </td>
              <td class="px-4 py-4 text-sm text-gray-500">{item.location}</td>
              <td class="px-4 py-4 text-sm">
                <div class="flex space-x-2">
                  <!-- Edit button -->
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <button 
                    class="text-[#1A5F7A] hover:text-[#56C271] transition-colors" 
                    on:click={() => openEditModal(item)}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  
                  <!-- Remove button -->
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <button 
                    class="text-[#1A5F7A] hover:text-red-500 transition-colors" 
                    on:click={() => removeDrug(item.id)}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
          
          {#if filteredInventory.length === 0}
            <tr>
              <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                No products found. Try adjusting your filters or search query.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </Card>
  
  <!-- Simplified Status Summary -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    <Card>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Expired Products</h2>
      <div class="text-3xl font-bold text-red-500">
        {inventory.filter(item => calculateExpiryDays(item.expiryDate) < 0).length}
      </div>
      <div class="mt-2">
        <button 
          class="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          on:click={() => {
            if (confirm('Are you sure you want to remove all expired drugs from inventory?')) {
              inventory = inventory.filter(item => calculateExpiryDays(item.expiryDate) >= 0);
            }
          }}
        >
          Remove All Expired
        </button>
      </div>
    </Card>
    
    <Card>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Expiring Soon</h2>
      <div class="text-3xl font-bold text-amber-500">
        {inventory.filter(item => calculateExpiryDays(item.expiryDate) < 30 && calculateExpiryDays(item.expiryDate) >= 0).length}
      </div>
      <p class="text-sm text-gray-500 mt-2">Products expiring within 30 days</p>
    </Card>
    
    <Card>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Total Products</h2>
      <div class="text-3xl font-bold text-[#1A5F7A]">
        {inventory.length}
      </div>
      <div class="text-sm text-gray-500 mt-2">
        Total quantity: {inventory.reduce((sum, item) => sum + item.stock, 0)} units
      </div>
    </Card>
  </div>
  
  <!-- Edit Modal -->
  {#if showEditModal && selectedProduct}
      <EditProductModal 
        product={selectedProduct} 
        onClose={() => showEditModal = false} 
        onSave={(product: Product) => handleProductUpdate(product)} 
      />
  {/if}
</div>