<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '../components/layouts/Card.svelte';
    import Chart from '../components/layouts/Chart.svelte';
    import Stat from '../components/layouts/Stat.svelte';
    import Badge from '../components/ui/Badge.svelte';
    import Button from '../components/ui/Button.svelte';
    
    // Mock data - replace with actual API calls in production
    let inventorySummary = {
      totalProducts: 1240,
      lowStock: 37,
      expiringSoon: 86,
      newArrivals: 53
    };
    
    let recentTransactions = [
      { 
        id: 'TRX-5432', 
        date: '2025-03-06', 
        type: 'incoming', 
        productName: 'Amoxicillin 500mg', 
        quantity: 500, 
        status: 'verified',
        supplier: 'AstraPharm Inc.' 
      },
      { 
        id: 'TRX-5431', 
        date: '2025-03-05', 
        type: 'outgoing', 
        productName: 'Lisinopril 10mg', 
        quantity: 200, 
        status: 'completed',
        receiver: 'HealthPlus Pharmacy' 
      },
      { 
        id: 'TRX-5430', 
        date: '2025-03-05', 
        type: 'incoming', 
        productName: 'Metformin 850mg', 
        quantity: 300, 
        status: 'pending',
        supplier: 'MediGlobal Ltd.' 
      },
      { 
        id: 'TRX-5429', 
        date: '2025-03-04', 
        type: 'outgoing', 
        productName: 'Atorvastatin 20mg', 
        quantity: 150, 
        status: 'completed',
        receiver: 'CareFirst Clinic' 
      },
      { 
        id: 'TRX-5428', 
        date: '2025-03-03', 
        type: 'incoming', 
        productName: 'Omeprazole 20mg', 
        quantity: 400, 
        status: 'verified',
        supplier: 'PharmaTech Solutions' 
      }
    ];
    
    // Chart data for inventory trend
    const inventoryChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Incoming',
          data: [1200, 1350, 1250, 1420, 1550, 1650],
          borderColor: '#1A5F7A',
          backgroundColor: 'rgba(26, 95, 122, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Outgoing',
          data: [1100, 1200, 1150, 1350, 1400, 1500],
          borderColor: '#56C271',
          backgroundColor: 'rgba(86, 194, 113, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
    
    // Chart data for product categories
    const categoryChartData = {
      labels: ['Antibiotics', 'Cardiovascular', 'Antidiabetics', 'Pain Management', 'GI Medication', 'Other'],
      datasets: [
        {
          data: [25, 20, 18, 15, 12, 10],
          backgroundColor: [
            '#1A5F7A', 
            '#56C271', 
            '#2A9D8F', 
            '#E9C46A', 
            '#F4A261', 
            '#E76F51'
          ],
          borderWidth: 0
        }
      ]
    };
    
    const chartOptions = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
    
    let pendingVerifications = [
      { 
        id: 'BTH-7896',
        productName: 'Metformin 850mg',
        manufacturer: 'MediGlobal Ltd.',
        quantity: 300,
        arrivalDate: '2025-03-05'
      },
      { 
        id: 'BTH-8102',
        productName: 'Sertraline 50mg',
        manufacturer: 'NeuroPharm Inc.',
        quantity: 250,
        arrivalDate: '2025-03-07'
      }
    ];
    
    let searchQuery = '';
    let filterStatus = 'all';
    
    function formatDate(dateStr: string) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    function getStatusBadgeType(status: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
      switch (status) {
        case 'verified':
          return 'success';
        case 'pending':
          return 'warning';
        case 'cancelled':
          return 'error';
        case 'completed':
          return 'info';
        default:
          return 'default';
      }
    }
    
    function getTransactionTypeIcon(type: string): string {
      return type === 'incoming' ? 'download' : 'upload';
    }
</script>
  
<div class="p-6 bg-[#F9FAFB] min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Intermediary Dashboard</h1>
      <p class="text-gray-500 mt-1">Overview of your inventory and transactions</p>
    </div>
    
    <!-- Quick Action Buttons -->
    <div class="flex flex-wrap gap-4 mb-6">
      <Button variant="primary" icon="download">Verify Incoming</Button>
      <Button variant="secondary" icon="upload">Initiate Transfer</Button>
      <Button variant="outline" icon="plus">Add to Inventory</Button>
    </div>
    
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Stat 
        title="Total Products" 
        value={inventorySummary.totalProducts} 
        icon="package" 
        color="blue" 
      />
      <Stat 
        title="Low Stock Items" 
        value={inventorySummary.lowStock} 
        change={-12} 
        icon="alert" 
        color="yellow" 
      />
      <Stat 
        title="Expiring Soon" 
        value={inventorySummary.expiringSoon} 
        change={8} 
        icon="clock" 
        color="red" 
      />
      <Stat 
        title="New Arrivals" 
        value={inventorySummary.newArrivals} 
        change={15} 
        icon="chart-up" 
        color="green" 
      />
    </div>
    
    <!-- Two-column layout for charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Inventory Movement Chart -->
      <Card title="Inventory Movement" icon="chart">
        <Chart 
          type="line" 
          data={inventoryChartData} 
          options={chartOptions} 
          height="300px" 
        />
      </Card>
      
      <!-- Product Categories Chart -->
      <Card title="Inventory by Category" icon="chart">
        <Chart 
          type="doughnut" 
          data={categoryChartData} 
          options={chartOptions} 
          height="300px" 
        />
      </Card>
    </div>
    
    <!-- Pending Verifications Section -->
    <Card title="Pending Verifications" icon="check">
      {#if pendingVerifications.length > 0}
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th class="px-4 py-3">Batch ID</th>
                <th class="px-4 py-3">Product</th>
                <th class="px-4 py-3">Manufacturer</th>
                <th class="px-4 py-3">Quantity</th>
                <th class="px-4 py-3">Arrival Date</th>
                <th class="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each pendingVerifications as item}
                <tr>
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">{item.id}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{item.productName}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{item.manufacturer}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{item.quantity}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{formatDate(item.arrivalDate)}</td>
                  <td class="px-4 py-3 text-sm font-medium">
                    <div class="flex space-x-2">
                      <Button variant="primary" size="sm">Verify</Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <div class="text-center py-6">
          <p class="text-gray-500">No pending verifications</p>
        </div>
      {/if}
    </Card>
    
    <!-- Recent Transactions Section -->
    <Card title="Recent Transactions" icon="list">
      <!-- Search and Filter Controls -->
      <div class="flex flex-wrap gap-4 mb-4">
        <div class="flex-1">
          <div class="relative">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search transactions..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        <select 
          bind:value={filterStatus}
          class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1A5F7A] focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      
      <!-- Transactions Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th class="px-4 py-3">ID</th>
              <th class="px-4 py-3">Date</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3">Product</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each recentTransactions as transaction}
              <tr>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">{transaction.id}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{formatDate(transaction.date)}</td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex items-center">
                    <span class={transaction.type === 'incoming' ? 'text-[#1A5F7A]' : 'text-[#56C271]'}>
                      <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path 
                          stroke-linecap="round" 
                          stroke-linejoin="round" 
                          stroke-width="2" 
                          d={transaction.type === 'incoming' 
                            ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                            : "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"}
                        ></path>
                      </svg>
                    </span>
                    <span class="capitalize">{transaction.type}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">{transaction.productName}</td>
                <td class="px-4 py-3 text-sm text-gray-500">{transaction.quantity}</td>
                <td class="px-4 py-3 text-sm">
                  <Badge text={transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)} type={getStatusBadgeType(transaction.status)} />
                </td>
                <td class="px-4 py-3 text-sm text-gray-500">
                  {#if transaction.type === 'incoming'}
                    From: {transaction.supplier}
                  {:else}
                    To: {transaction.receiver}
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-500">
          Showing 1-5 of 24 transactions
        </div>
        <div class="flex space-x-2">
          <Button variant="outline" size="sm" disabled={true}>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </Card>
</div>