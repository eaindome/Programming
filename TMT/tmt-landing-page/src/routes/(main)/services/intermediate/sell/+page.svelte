<script lang="ts">
    import { onMount } from 'svelte';
    // @ts-ignore
    import { v4 as uuidv4 } from 'uuid';
    import QrScanner from './components/QrScanner.svelte';
    import MedicationSearch from './components/MedicationSearch.svelte';
    import SalesSummary from './components/SalesSummary.svelte';
    import ReceiptModal from './components/ReceiptModal.svelte';
    import Alert from './components/Alert.svelte';
  
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
  
    type Customer = {
      id: string;
      name: string;
      email: string;
      phone: string;
      type: 'individual' | 'pharmacy' | 'distributor';
    };
  
    type Sale = {
      id: string;
      items: SaleItem[];
      customerId: string;
      customerDetails: Customer | null;
      total: number;
      timestamp: Date;
      paymentMethod: 'cash' | 'card' | 'insurance' | 'credit';
      status: 'pending' | 'completed' | 'cancelled';
      receiptNumber: string;
    };
  
    // State variables
    let showScanner = false;
    let currentSale: Sale = createNewSale();
    let searchResults: Medication[] = [];
    let showReceiptModal = false;
    let alertMessage = '';
    let alertType: 'success' | 'error' | 'warning' = 'success';
    let showAlert = false;
    let customers: Customer[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-1234', type: 'individual' },
      { id: '2', name: 'City Pharmacy', email: 'orders@citypharmacy.com', phone: '555-5678', type: 'pharmacy' },
      { id: '3', name: 'MedPlus Distributors', email: 'supply@medplus.com', phone: '555-9012', type: 'distributor' }
    ];
    let selectedCustomerId = '';
  
    // Sample medication data (in a real app, this would come from API)
    let availableMedications: Medication[] = [
      {
        id: '1',
        name: 'Amoxicillin 500mg',
        manufacturer: 'PharmaCorp',
        batchNumber: 'BT2023-045',
        expiryDate: '2025-06-30',
        price: 12.99,
        dosage: '500mg',
        qrCode: 'AMX500-BT2023-045',
        verificationStatus: 'verified'
      },
      {
        id: '2',
        name: 'Lisinopril 10mg',
        manufacturer: 'HealthGen',
        batchNumber: 'BT2023-112',
        expiryDate: '2025-08-15',
        price: 15.50,
        dosage: '10mg',
        qrCode: 'LIS10-BT2023-112',
        verificationStatus: 'verified'
      },
      {
        id: '3',
        name: 'Metformin 850mg',
        manufacturer: 'DiaCare',
        batchNumber: 'BT2023-078',
        expiryDate: '2025-04-22',
        price: 8.75,
        dosage: '850mg',
        qrCode: 'MET850-BT2023-078',
        verificationStatus: 'verified'
      }
    ];
  
    // Functions
    function createNewSale(): Sale {
      return {
        id: uuidv4(),
        items: [],
        customerId: '',
        customerDetails: null,
        total: 0,
        timestamp: new Date(),
        paymentMethod: 'cash',
        status: 'pending',
        receiptNumber: `TMT-${Math.floor(Math.random() * 10000)}`
      };
    }
  
    function handleScanResult(qrCode: string) {
      // Simulate QR code verification with blockchain
      setTimeout(() => {
        const medication = availableMedications.find(med => med.qrCode === qrCode);
        
        if (medication) {
          addMedicationToSale(medication);
          showAlert = true;
          alertType = 'success';
          alertMessage = `${medication.name} verified and added to sale`;
        } else {
          showAlert = true;
          alertType = 'error';
          alertMessage = 'Unrecognized or potentially counterfeit medication';
        }
        
        showScanner = false;
      }, 800);
    }
  
    function addMedicationToSale(medication: Medication) {
      const existingItemIndex = currentSale.items.findIndex(
        item => item.medicationId === medication.id
      );
  
      if (existingItemIndex >= 0) {
        currentSale.items[existingItemIndex].quantity += 1;
        currentSale.items[existingItemIndex].subtotal = 
          currentSale.items[existingItemIndex].quantity * medication.price;
      } else {
        currentSale.items = [
          ...currentSale.items,
          {
            medicationId: medication.id,
            medication: medication,
            quantity: 1,
            subtotal: medication.price
          }
        ];
      }
  
      calculateTotal();
    }
  
    function removeMedicationFromSale(index: number) {
      currentSale.items = currentSale.items.filter((_, i) => i !== index);
      calculateTotal();
    }
  
    function updateQuantity(index: number, newQuantity: number) {
      if (newQuantity <= 0) {
        removeMedicationFromSale(index);
        return;
      }
      
      currentSale.items[index].quantity = newQuantity;
      currentSale.items[index].subtotal = 
        newQuantity * currentSale.items[index].medication.price;
      
      calculateTotal();
    }
  
    function calculateTotal() {
      currentSale.total = currentSale.items.reduce(
        (sum, item) => sum + item.subtotal, 0
      );
    }
  
    function handleSearchResult(medication: Medication) {
      addMedicationToSale(medication);
      showAlert = true;
      alertType = 'success';
      alertMessage = `${medication.name} added to sale`;
    }
  
    function handleCustomerChange() {
      if (selectedCustomerId) {
        currentSale.customerId = selectedCustomerId;
        currentSale.customerDetails = customers.find(c => c.id === selectedCustomerId) || null;
      } else {
        currentSale.customerId = '';
        currentSale.customerDetails = null;
      }
    }
  
    function completeSale() {
      if (currentSale.items.length === 0) {
        showAlert = true;
        alertType = 'warning';
        alertMessage = 'Cannot complete a sale with no items';
        return;
      }
  
      if (!currentSale.customerId) {
        showAlert = true;
        alertType = 'warning';
        alertMessage = 'Please select a customer to complete the sale';
        return;
      }
  
      // In a real app, this would be where we send the sale to the blockchain
      // and update our database
      currentSale.status = 'completed';
      currentSale.timestamp = new Date();
      
      // Show receipt modal
      showReceiptModal = true;
    }
  
    function closeReceiptAndReset() {
      showReceiptModal = false;
      // Create a new sale after completing the current one
      currentSale = createNewSale();
      selectedCustomerId = '';
    }
  
    onMount(() => {
      // Any initialization code could go here
    });
  </script>
  
  <div class="min-h-screen bg-[#F9FAFB]">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-[#1A5F7A]">Sell Medications</h1>
        <p class="text-gray-600">Record sales and generate receipts for verified medications</p>
      </div>
  
      {#if showAlert}
        <Alert 
          message={alertMessage} 
          type={alertType} 
          onClose={() => showAlert = false} 
        />
      {/if}
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Product Lookup -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-[#1A5F7A]">Add Medications</h2>
              <button 
                on:click={() => showScanner = !showScanner}
                class="bg-[#1A5F7A] text-white px-4 py-2 rounded-md hover:bg-opacity-90 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {showScanner ? 'Hide Scanner' : 'Scan QR Code'}
              </button>
            </div>
  
            {#if showScanner}
              <div class="mb-6 p-4 border border-[#E2E8F0] rounded-lg">
                <QrScanner onScan={handleScanResult} />
              </div>
            {/if}
  
            <MedicationSearch 
              medications={availableMedications} 
              onSelect={handleSearchResult} 
            />
          </div>
  
          <!-- Sale Items Table -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-[#1A5F7A] mb-4">Current Sale</h2>
            
            {#if currentSale.items.length === 0}
              <div class="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 text-[#E2E8F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>No items added to the current sale</p>
              </div>
            {:else}
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-[#E2E8F0]">
                  <thead>
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-[#E2E8F0]">
                    {#each currentSale.items as item, index}
                      <tr>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <div class="flex items-center">
                            <div>
                              <div class="text-sm font-medium text-gray-900">{item.medication.name}</div>
                              <div class="text-sm text-gray-500">{item.medication.manufacturer} | Batch: {item.medication.batchNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          {#if item.medication.verificationStatus === 'verified'}
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#56C271] text-white">
                              Verified
                            </span>
                          {:else if item.medication.verificationStatus === 'warning'}
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Warning
                            </span>
                          {:else}
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Unverified
                            </span>
                          {/if}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          ${item.medication.price.toFixed(2)}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap">
                          <div class="flex items-center">
                            <button 
                              on:click={() => updateQuantity(index, item.quantity - 1)}
                              class="bg-[#E2E8F0] rounded-l p-1 w-8 text-center"
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              min="1" 
                              value={item.quantity} 
                              on:change={(e) => {
                                if (e.target) {
                                  updateQuantity(index, parseInt((e.target as HTMLInputElement).value));
                                }
                              }}
                              class="w-12 text-center border-t border-b border-[#E2E8F0] p-1"
                            />
                            <button 
                              on:click={() => updateQuantity(index, item.quantity + 1)}
                              class="bg-[#E2E8F0] rounded-r p-1 w-8 text-center"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                          ${item.subtotal.toFixed(2)}
                        </td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <button 
                            on:click={() => removeMedicationFromSale(index)}
                            class="text-red-600 hover:text-red-900"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {/if}
          </div>
        </div>
  
        <!-- Right Column: Sale Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-[#1A5F7A] mb-4">Sale Summary</h2>
            
            <div class="mb-4">
              <label for="customer" class="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
              <select 
                id="customer" 
                bind:value={selectedCustomerId} 
                on:change={handleCustomerChange}
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-[#E2E8F0] focus:outline-none focus:ring-[#1A5F7A] focus:border-[#1A5F7A] rounded-md"
              >
                <option value="">Select a customer</option>
                {#each customers as customer}
                  <option value={customer.id}>
                    {customer.name} ({customer.type})
                  </option>
                {/each}
              </select>
            </div>
  
            <div class="mb-4">
              <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select 
                id="paymentMethod" 
                bind:value={currentSale.paymentMethod}
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-[#E2E8F0] focus:outline-none focus:ring-[#1A5F7A] focus:border-[#1A5F7A] rounded-md"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="insurance">Insurance</option>
                <option value="credit">Store Credit</option>
              </select>
            </div>
  
            <SalesSummary 
              items={currentSale.items} 
              total={currentSale.total} 
            />
  
            <div class="mt-6">
              <button 
                on:click={completeSale}
                class="w-full bg-[#56C271] hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56C271] disabled:opacity-50"
                disabled={currentSale.items.length === 0}
              >
                Complete Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {#if showReceiptModal}
    <ReceiptModal 
      sale={currentSale} 
      onClose={closeReceiptAndReset} 
    />
  {/if}