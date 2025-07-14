<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '../../../dashboard/components/layouts/Card.svelte';
    import Button from '../../../dashboard/components/ui/Button.svelte';
    import Stat from '../../../dashboard/components/layouts/Stat.svelte';
    import Badge from '../../../dashboard/components/ui/Badge.svelte';
    import Chart from '../../../dashboard/components/layouts/Chart.svelte';
    
    // Mock data - in a real app, this would come from an API
    let recentScans = [
      { id: 'SC123456', productName: 'Amoxicillin 500mg', date: '2025-03-05T14:30:00', status: 'verified', manufacturer: 'PharmaCorp Inc.' },
      { id: 'SC123455', productName: 'Lipitor 20mg', date: '2025-03-01T09:15:00', status: 'verified', manufacturer: 'MediPharm Ltd.' },
      { id: 'SC123454', productName: 'Advil 200mg', date: '2025-02-25T16:45:00', status: 'verified', manufacturer: 'HealthCare Global' }
    ];
    
    let verificationStats = {
      totalScans: 24,
      verifiedProducts: 24,
      suspiciousProducts: 0,
      lastScan: '2 days ago'
    };
    
    let activeTab = 'dashboard';
    let scanInput = '';
    let cameraActive = false;
    let reportFormData = {
      product: '',
      batchNumber: '',
      issueType: '',
      description: '',
      contactEmail: ''
    };
    
    let issueTypes = [
      'Packaging Damage',
      'Label Discrepancy',
      'Expiration Date Issue',
      'Suspected Counterfeit',
      'Medication Appearance',
      'Other'
    ];
    
    // Chart data for verification history
    const chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product Verifications',
          data: [4, 5, 3, 6, 2, 4],
          backgroundColor: 'rgba(26, 95, 122, 0.2)',
          borderColor: '#1A5F7A',
          borderWidth: 2,
          tension: 0.4
        }
      ]
    };
    
    const chartOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    };
    
    function handleVerify() {
      if (!scanInput) return;
      
      // In a real app, this would call an API to verify the product
      alert(`Verifying product with code: ${scanInput}`);
      scanInput = '';
    }
    
    function toggleCamera() {
      cameraActive = !cameraActive;
      
      if (cameraActive) {
        // In a real app, this would initialize the camera and QR scanner
        setTimeout(() => {
          // Simulate a successful scan after 3 seconds
          scanInput = 'TMT' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
          cameraActive = false;
        }, 3000);
      }
    }
    
    function submitReport() {
      // In a real app, this would submit the report to an API
      alert('Thank you for your report. It has been submitted successfully.');
      resetReportForm();
    }
    
    function resetReportForm() {
      reportFormData = {
        product: '',
        batchNumber: '',
        issueType: '',
        description: '',
        contactEmail: ''
      };
    }
    
    onMount(() => {
      // In a real app, this would fetch data from an API
    });
  </script>
  
  <div class="p-6 bg-[#F9FAFB] min-h-screen">
    <!-- Navigation tabs -->
    <div class="mb-6 flex border-b border-[#E2E8F0]">
      <button 
        class={`py-3 px-4 font-medium text-sm ${activeTab === 'dashboard' ? 'text-[#1A5F7A] border-b-2 border-[#1A5F7A]' : 'text-gray-500 hover:text-[#1A5F7A]'}`}
        on:click={() => activeTab = 'dashboard'}
      >
        Dashboard
      </button>
      <button 
        class={`py-3 px-4 font-medium text-sm ${activeTab === 'verify' ? 'text-[#1A5F7A] border-b-2 border-[#1A5F7A]' : 'text-gray-500 hover:text-[#1A5F7A]'}`}
        on:click={() => activeTab = 'verify'}
      >
        Verify Product
      </button>
      <button 
        class={`py-3 px-4 font-medium text-sm ${activeTab === 'history' ? 'text-[#1A5F7A] border-b-2 border-[#1A5F7A]' : 'text-gray-500 hover:text-[#1A5F7A]'}`}
        on:click={() => activeTab = 'history'}
      >
        Verification History
      </button>
      <button 
        class={`py-3 px-4 font-medium text-sm ${activeTab === 'report' ? 'text-[#1A5F7A] border-b-2 border-[#1A5F7A]' : 'text-gray-500 hover:text-[#1A5F7A]'}`}
        on:click={() => activeTab = 'report'}
      >
        Report Issue
      </button>
    </div>
    
    <!-- Dashboard Tab -->
    {#if activeTab === 'dashboard'}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Stat 
          title="Total Scans" 
          value={verificationStats.totalScans} 
          icon="package" 
          color="blue" 
        />
        <Stat 
          title="Verified Products" 
          value={verificationStats.verifiedProducts} 
          icon="check-circle" 
          color="green" 
        />
        <Stat 
          title="Suspicious Products" 
          value={verificationStats.suspiciousProducts} 
          icon="alert" 
          color="red" 
        />
        <Stat 
          title="Last Scan" 
          value={verificationStats.lastScan} 
          icon="clock" 
          color="blue" 
        />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <Card title="Verification Activity" icon="chart">
            <div class="h-72">
              <Chart type="line" data={chartData} options={chartOptions} height="100%" />
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Quick Verification" icon="check">
            <div class="mb-4">
              <label for="quick-verify" class="block text-sm font-medium text-gray-700 mb-1">
                Enter Product Code
              </label>
              <div class="flex">
                <input 
                  id="quick-verify"
                  type="text" 
                  placeholder="TMT123456" 
                  bind:value={scanInput}
                  class="flex-1 rounded-l-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
                />
                <Button 
                  variant="primary" 
                  on:click={toggleCamera}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </Button>
              </div>
            </div>
            
            {#if cameraActive}
              <div class="bg-gray-100 rounded-lg p-4 mb-4 text-center aspect-video flex items-center justify-center">
                <div class="animate-pulse text-gray-600">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p>Camera active. Point at QR code...</p>
                </div>
              </div>
            {/if}
            
            <Button 
              variant="primary" 
              fullWidth={true} 
              on:click={handleVerify}
              icon="check"
              disabled={!scanInput}
            >
              Verify Product
            </Button>
          </Card>
        </div>
      </div>
      
      <div class="mt-6">
        <Card title="Recent Verifications" icon="list">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-[#E2E8F0]">
              <thead>
                <tr>
                  <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                  <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-[#E2E8F0]">
                {#each recentScans as scan}
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-900">{scan.id}</td>
                    <td class="px-4 py-3 text-sm text-gray-900 font-medium">{scan.productName}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">{scan.manufacturer}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">{new Date(scan.date).toLocaleString()}</td>
                    <td class="px-4 py-3 text-sm">
                      {#if scan.status === 'verified'}
                        <Badge text="Verified" type="success" />
                      {:else if scan.status === 'suspicious'}
                        <Badge text="Suspicious" type="warning" />
                      {:else if scan.status === 'fake'}
                        <Badge text="Fake" type="error" />
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    {/if}
    
    <!-- Verify Product Tab -->
    {#if activeTab === 'verify'}
      <Card title="Verify Medication Authenticity" icon="check">
        <div class="max-w-2xl mx-auto">
          <div class="mb-6">
            <p class="text-gray-600 mb-4">
              Verify your medication's authenticity by scanning the QR code on the packaging or entering the product code manually.
            </p>
            
            <div class="flex flex-col space-y-4">
              <div>
                <label for="product-code" class="block text-sm font-medium text-gray-700 mb-1">
                  Product Code
                </label>
                <div class="flex">
                  <input 
                    id="product-code"
                    type="text" 
                    placeholder="TMT123456" 
                    bind:value={scanInput}
                    class="flex-1 rounded-l-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
                  />
                  <Button 
                    variant="primary" 
                    on:click={toggleCamera}
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {#if cameraActive}
            <div class="bg-gray-100 rounded-lg p-4 mb-6 text-center aspect-video flex items-center justify-center">
              <div class="animate-pulse text-gray-600">
                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p>Camera active. Point at QR code...</p>
              </div>
            </div>
          {/if}
          
          <div class="flex justify-center">
            <Button 
              variant="primary" 
              size="lg"
              on:click={handleVerify}
              icon="check"
              disabled={!scanInput}
            >
              Verify Product
            </Button>
          </div>
          
          <div class="mt-8 border-t border-[#E2E8F0] pt-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">How Verification Works</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">1</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Scan or Enter Code</h4>
                <p class="text-sm text-gray-600">Scan the QR code on your medication packaging or enter the product code manually.</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">2</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Verification Process</h4>
                <p class="text-sm text-gray-600">Our system checks the blockchain to verify the authenticity of your medication.</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">3</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Get Results</h4>
                <p class="text-sm text-gray-600">Receive immediate confirmation that your medication is authentic or be alerted to potential issues.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    {/if}
    
    <!-- Verification History Tab -->
    {#if activeTab === 'history'}
      <Card title="Your Verification History" icon="list">
        <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <p class="text-gray-600 mb-4 md:mb-0">
            View your past medication verification records.
          </p>
          
          <div class="flex space-x-2">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <Button variant="outline" icon="download">
              Export
            </Button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#E2E8F0]">
            <thead>
              <tr>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scan ID</th>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-[#E2E8F0]">
                {#each [...recentScans, 
                { id: 'SC123453', productName: 'Zyrtec 10mg', date: '2025-02-15T10:20:00', status: 'verified', manufacturer: 'AllergyRelief Inc.' },
                { id: 'SC123452', productName: 'Tylenol Extra Strength', date: '2025-02-10T14:30:00', status: 'verified', manufacturer: 'PainRelief Co.' },
                { id: 'SC123451', productName: 'Ibuprofen 400mg', date: '2025-02-05T09:45:00', status: 'verified', manufacturer: 'MediPharm Ltd.' },
                { id: 'SC123450', productName: 'Lexapro 10mg', date: '2025-01-28T16:15:00', status: 'verified', manufacturer: 'MentalHealth Solutions' }
              ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as scan}
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm text-gray-900">{scan.id}</td>
                  <td class="px-4 py-3 text-sm text-gray-900 font-medium">{scan.productName}</td>
                  <td class="px-4 py-3 text-sm text-gray-600">{scan.manufacturer}</td>
                  <td class="px-4 py-3 text-sm text-gray-600">{new Date(scan.date).toLocaleString()}</td>
                  <td class="px-4 py-3 text-sm">
                    {#if scan.status === 'verified'}
                      <Badge text="Verified" type="success" />
                    {:else if scan.status === 'suspicious'}
                      <Badge text="Suspicious" type="warning" />
                    {:else if scan.status === 'fake'}
                      <Badge text="Fake" type="error" />
                    {/if}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="text-[#1A5F7A] hover:text-[#154a5e]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        
        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">1</span> to <span class="font-medium">7</span> of <span class="font-medium">7</span> results
          </div>
          
          <div class="flex space-x-2">
            <button class="px-3 py-1 border border-[#E2E8F0] rounded-md text-sm text-gray-500 bg-white disabled:opacity-50" disabled>
              Previous
            </button>
            <button class="px-3 py-1 border border-[#E2E8F0] rounded-md text-sm text-gray-500 bg-white disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </Card>
    {/if}
    
    <!-- Report Issue Tab -->
    {#if activeTab === 'report'}
      <Card title="Report an Issue" icon="alert">
        <div class="max-w-2xl mx-auto">
          <p class="text-gray-600 mb-6">
            If you notice any discrepancies or have concerns about your medication, please report them through this form.
          </p>
          
          <form on:submit|preventDefault={submitReport} class="space-y-6">
            <div>
              <label for="product" class="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input 
                id="product"
                type="text" 
                bind:value={reportFormData.product}
                required
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="batch-number" class="block text-sm font-medium text-gray-700 mb-1">
                Batch Number (if available)
              </label>
              <input 
                id="batch-number"
                type="text" 
                bind:value={reportFormData.batchNumber}
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              />
            </div>
            
            <div>
              <label for="issue-type" class="block text-sm font-medium text-gray-700 mb-1">
                Issue Type
              </label>
              <select 
                id="issue-type"
                bind:value={reportFormData.issueType}
                required
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              >
                <option value="">Select an issue type</option>
                {#each issueTypes as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                id="description"
                bind:value={reportFormData.description}
                required
                rows="4"
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              ></textarea>
            </div>
            
            <div>
              <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">
                Contact Email (optional)
              </label>
              <input 
                id="contact-email"
                type="email" 
                bind:value={reportFormData.contactEmail}
                class="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1A5F7A] focus:border-[#1A5F7A]"
              />
              <p class="text-xs text-gray-500 mt-1">
                If provided, we may contact you for additional information about the reported issue.
              </p>
            </div>
            
            <div class="flex items-center space-x-4">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                icon="alert"
              >
                Submit Report
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                on:click={resetReportForm}
              >
                Cancel
              </Button>
            </div>
          </form>
          
          <div class="mt-8 border-t border-[#E2E8F0] pt-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">What Happens After You Report</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">1</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Report Review</h4>
                <p class="text-sm text-gray-600">Our team reviews your report within 24 hours to assess the issue.</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">2</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Investigation</h4>
                <p class="text-sm text-gray-600">We investigate the reported issue with manufacturers and our blockchain records.</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg border border-[#E2E8F0] shadow-sm">
                <div class="w-10 h-10 rounded-full bg-[#1A5F7A]/10 flex items-center justify-center mb-3">
                  <span class="text-[#1A5F7A] font-bold">3</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">Resolution</h4>
                <p class="text-sm text-gray-600">You'll receive a notification about our findings and any actions taken.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    {/if}
    
    <!-- Footer -->
    <div class="mt-8 pt-4 border-t border-[#E2E8F0] text-center text-sm text-gray-500">
      <p>© 2025 MedVerify - Ensuring your medication safety through blockchain verification</p>
      <div class="mt-2 space-x-4">
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" class="text-[#1A5F7A] hover:underline">Privacy Policy</a>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" class="text-[#1A5F7A] hover:underline">Terms of Service</a>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" class="text-[#1A5F7A] hover:underline">Contact Us</a>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" class="text-[#1A5F7A] hover:underline">Help Center</a>
      </div>
    </div>
  </div>