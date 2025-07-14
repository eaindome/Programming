<script lang="ts">
    import Chart from '../../../dashboard/components/layouts/Chart.svelte';
    import Card from '../../../dashboard/components/layouts/Card.svelte';
    import Stat from '../../../dashboard/components/layouts/Stat.svelte';
    import Badge from '../../../dashboard/components/ui/Badge.svelte';
    import Button from '../../../dashboard/components/ui/Button.svelte';
    
    // Mock data for the dashboard
    const batchesData = {
      datasets: [
        {
          label: 'Number of Batches',
          data: [65, 78, 52, 74, 83, 90, 87],
          backgroundColor: '#1A5F7A',
          borderColor: '#1A5F7A',
          borderWidth: 2,
          tension: 0.4,
          fill: false
        }
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    };
    
    const recallsData = {
      datasets: [
        {
          label: 'Recalls',
          data: [2, 1, 0, 0, 3, 1, 0],
          backgroundColor: '#FF6B6B',
          borderColor: '#FF6B6B',
          borderWidth: 2,
        }
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    };
    
    const recentBatches = [
      { id: 'BTC-2023-07-123', name: 'Ibuprofen 200mg', date: '2023-07-15', status: 'Active', verifications: 142 },
      { id: 'BTC-2023-07-122', name: 'Paracetamol 500mg', date: '2023-07-14', status: 'Active', verifications: 98 },
      { id: 'BTC-2023-07-121', name: 'Amoxicillin 250mg', date: '2023-07-12', status: 'Active', verifications: 56 },
      { id: 'BTC-2023-07-120', name: 'Loratadine 10mg', date: '2023-07-10', status: 'Active', verifications: 87 },
      { id: 'BTC-2023-07-119', name: 'Cetirizine 10mg', date: '2023-07-08', status: 'Active', verifications: 65 }
    ];
    
    const activeRecalls = [
      { id: 'RCL-2023-05-003', product: 'Lisinopril 20mg', date: '2023-05-18', reason: 'Label Error', batches: 3 },
      { id: 'RCL-2023-05-002', product: 'Metformin 500mg', date: '2023-05-10', reason: 'Quality Concern', batches: 2 }
    ];
  </script>
  
  <svelte:head>
    <title>Industry Dashboard | Track My Meds</title>
  </svelte:head>
  
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Industry Dashboard</h1>
      <div class="flex space-x-3">
        <Button variant="outline" icon="download" iconPosition="left">Export Data</Button>
        <Button icon="plus" iconPosition="left">Create New Batch</Button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat title="Total Batches" value="529" change={4.2} icon="package" color="blue" />
      <Stat title="Active Batches" value="487" change={2.8} icon="check-circle" color="green" />
      <Stat title="Verifications (30d)" value="12,487" change={8.7} icon="chart-up" color="blue" />
      <Stat title="Active Recalls" value="2" change={-33.3} icon="alert" color="red" />
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Batch Production Trend" icon="chart">
        <Chart type="line" data={batchesData} height="250px" />
      </Card>
      
      <Card title="Recalls History" icon="alert">
        <Chart type="bar" data={recallsData} height="250px" />
      </Card>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Recent Batches" icon="package">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verifications</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each recentBatches as batch}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#1A5F7A]">{batch.id}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{batch.name}</td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{batch.date}</td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <Badge text="Active" type="success" />
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{batch.verifications}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="mt-4 text-right">
          <a href="/industry/batches" class="text-sm font-medium text-[#1A5F7A] hover:underline">
            View all batches →
          </a>
        </div>
      </Card>
      
      <Card title="Active Recalls" icon="alert">
        {#if activeRecalls.length > 0}
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recall ID</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batches</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each activeRecalls as recall}
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#1A5F7A]">{recall.id}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{recall.product}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{recall.date}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{recall.reason}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{recall.batches}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <div class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No active recalls</h3>
            <p class="mt-1 text-sm text-gray-500">All your products are currently in good standing.</p>
          </div>
        {/if}
        <div class="mt-4 text-right">
          <a href="/industry/recalls" class="text-sm font-medium text-[#1A5F7A] hover:underline">
            View all recalls →
          </a>
        </div>
      </Card>
    </div>
  </div>