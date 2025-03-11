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
    
    // Props
    export let sale: Sale;
    export let onClose: () => void;
    
    // Computed
    $: subtotal = sale.total;
    $: tax = subtotal * 0.08;
    $: discount = subtotal >= 100 ? subtotal * 0.05 : 0;
    $: total = subtotal + tax - discount;
    
    // Create QR code for blockchain verification (simulated)
    let receiptQrCode = `TMT-REC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    function formatDate(date: Date): string {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    }
    
    function getPaymentMethodText(method: string): string {
      switch(method) {
        case 'cash': return 'Cash';
        case 'card': return 'Credit/Debit Card';
        case 'insurance': return 'Insurance';
        case 'credit': return 'Store Credit';
        default: return method;
      }
    }
    
    function printReceipt() {
      window.print();
    }
    
    function emailReceipt() {
      // In a real app, this would send an API request
      alert(`Receipt would be emailed to ${sale.customerDetails?.email || 'customer'}`);
    }
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold text-[#1A5F7A]">Receipt</h2>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button 
            on:click={onClose}
            class="text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="receipt-content print:text-black" id="receipt-to-print">
          <!-- Header -->
          <div class="text-center mb-6">
            <h1 class="text-xl font-bold text-[#1A5F7A]">Track My Meds</h1>
            <p class="text-gray-600">Secure Medication Verification System</p>
            <div class="text-sm text-gray-500 mt-1">Receipt #{sale.receiptNumber}</div>
            <div class="text-sm text-gray-500">{formatDate(sale.timestamp)}</div>
          </div>
          
          <!-- Customer Info -->
          {#if sale.customerDetails}
            <div class="mb-6 p-3 bg-gray-50 rounded border border-[#E2E8F0]">
              <h3 class="font-medium mb-1">Customer</h3>
              <div>{sale.customerDetails.name}</div>
              <div class="text-sm text-gray-600">{sale.customerDetails.email}</div>
              <div class="text-sm text-gray-600">{sale.customerDetails.phone}</div>
              <div class="text-xs text-gray-500 mt-1">Customer Type: {sale.customerDetails.type}</div>
            </div>
          {/if}
          
          <!-- Items -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Medications</h3>
            <table class="w-full text-sm">
              <thead class="border-b border-[#E2E8F0]">
                <tr>
                  <th class="text-left py-2">Item</th>
                  <th class="text-center py-2">QTY</th>
                  <th class="text-right py-2">Price</th>
                  <th class="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {#each sale.items as item}
                  <tr class="border-b border-[#E2E8F0]">
                    <td class="py-2">
                      <div>{item.medication.name}</div>
                      <div class="text-xs text-gray-500">Batch: {item.medication.batchNumber}</div>
                    </td>
                    <td class="text-center py-2">{item.quantity}</td>
                    <td class="text-right py-2">${item.medication.price.toFixed(2)}</td>
                    <td class="text-right py-2">${item.subtotal.toFixed(2)}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          
          <!-- Summary -->
          <div class="mb-6">
            <div class="flex justify-between py-1">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between py-1">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {#if discount > 0}
              <div class="flex justify-between py-1 text-[#56C271]">
                <span>Discount (5%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            {/if}
            <div class="flex justify-between font-bold text-[#1A5F7A] pt-2 border-t border-[#E2E8F0] mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div class="text-sm text-gray-600 mt-2">
              Payment Method: {getPaymentMethodText(sale.paymentMethod)}
            </div>
          </div>
          
          <!-- Verification -->
          <div class="text-center mb-6">
            <div class="text-sm font-medium mb-2">Blockchain Verification</div>
            <div class="bg-gray-100 inline-block p-4 rounded-lg">
              <!-- This would be a real QR code in a production app -->
              <div class="w-24 h-24 bg-white border-2 border-[#1A5F7A] flex items-center justify-center">
                <div class="text-xs text-center">QR Code<br/>{receiptQrCode}</div>
              </div>
            </div>
            <div class="text-xs text-gray-500 mt-2">
              Scan to verify authenticity on TMT blockchain
            </div>
          </div>
          
          <!-- Footer -->
          <div class="text-center text-xs text-gray-500 border-t border-[#E2E8F0] pt-4">
            <p>All medications in this transaction have been verified through</p>
            <p>the Track My Meds blockchain verification system.</p>
            <p class="mt-2">Thank you for choosing authentic medications.</p>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex justify-center mt-6 space-x-4 print:hidden">
          <button 
            on:click={printReceipt}
            class="bg-[#1A5F7A] text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          
          <button 
            on:click={emailReceipt}
            class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    @media print {
      
      #receipt-to-print, #receipt-to-print * {
        visibility: visible;
      }
      #receipt-to-print {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
  </style>