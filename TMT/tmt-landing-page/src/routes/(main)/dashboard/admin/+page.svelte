<script lang="ts">
    import Card from '../components/layouts/Card.svelte';
    import Chart from '../components/layouts/Chart.svelte';
    import Stat from '../components/layouts/Stat.svelte';
    import Badge from '../components/ui/Badge.svelte';
    import Button from '../components/ui/Button.svelte';
    import { onMount } from 'svelte';
  
    // Mock data for the dashboard
    let transactionStats = {
      total: 5642,
      verified: 5321,
      pending: 245,
      flagged: 76
    };
  
    let userStats = {
      total: 458,
      industry: 82,
      intermediary: 156,
      consumer: 194,
      admin: 26
    };
  
    let systemHealth = {
      uptime: '99.98%',
      responseTime: '120ms',
      activeNodes: 24,
      lastBackup: '2h ago'
    };
  
    let recentIssues = [
      { id: 'ISS-425', description: 'Batch verification failure', status: 'critical', timestamp: '22 min ago', actors: ['manufacturer', 'distributor'] },
      { id: 'ISS-424', description: 'Chain of custody alert', status: 'high', timestamp: '1h ago', actors: ['distributor'] },
      { id: 'ISS-423', description: 'Multiple verification attempts', status: 'medium', timestamp: '3h ago', actors: ['consumer'] },
      { id: 'ISS-422', description: 'Temperature range exceeded', status: 'high', timestamp: '5h ago', actors: ['distributor'] },
      { id: 'ISS-421', description: 'Unexpected scan location', status: 'medium', timestamp: '8h ago', actors: ['pharmacy'] }
    ];
  
    let recentUsers = [
      { id: 'USR-193', name: 'Johnson Pharmaceuticals', type: 'industry', status: 'active', lastActive: '12 min ago' },
      { id: 'USR-192', name: 'MediExpress Logistics', type: 'intermediary', status: 'active', lastActive: '45 min ago' },
      { id: 'USR-191', name: 'Sarah Chen', type: 'consumer', status: 'active', lastActive: '1h ago' },
      { id: 'USR-190', name: 'Westlake Pharmacy', type: 'intermediary', status: 'inactive', lastActive: '2d ago' }
    ];
  
    // Chart data
    let transactionChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Total Transactions',
          data: [650, 750, 820, 910, 970, 1050, 1120],
          borderColor: '#1A5F7A',
          backgroundColor: 'rgba(26, 95, 122, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Flagged Transactions',
          data: [12, 19, 15, 17, 21, 25, 10],
          borderColor: '#e11d48',
          backgroundColor: 'rgba(225, 29, 72, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  
    let userActivityData = {
      labels: ['Industry', 'Intermediary', 'Consumer', 'Admin'],
      datasets: [
        {
          label: 'Active Users by Role',
          data: [75, 134, 180, 26],
          backgroundColor: [
            'rgba(56, 189, 248, 0.8)',
            'rgba(26, 95, 122, 0.8)',
            'rgba(86, 194, 113, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderWidth: 1
        }
      ]
    };
  
    let userGrowthData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'New Users',
          data: [30, 45, 35, 55, 40, 60, 45],
          borderColor: '#56C271',
          backgroundColor: 'rgba(86, 194, 113, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  
    let issueStatusData = {
      labels: ['Resolved', 'In Progress', 'New', 'Escalated'],
      datasets: [
        {
          label: 'Issues by Status',
          data: [243, 56, 32, 15],
          backgroundColor: [
            'rgba(86, 194, 113, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(26, 95, 122, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          hoverOffset: 4
        }
      ]
    };
  
    // Determine status color
    function getStatusColor(status: string) {
      switch (status.toLowerCase()) {
        case 'critical': return 'error';
        case 'high': return 'warning';
        case 'medium': return 'info';
        case 'low': return 'success';
        case 'active': return 'success';
        case 'inactive': return 'error';
        default: return 'default';
      }
    }
  
    // Get user type badge
    function getUserTypeBadge(type: string) {
      switch (type.toLowerCase()) {
        case 'industry': return 'info';
        case 'intermediary': return 'warning';
        case 'consumer': return 'success';
        case 'admin': return 'default';
        default: return 'default';
      }
    }
  </script>
  
  <div class="min-h-screen bg-[#F9FAFB] p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Administrator Dashboard</h1>
      <p class="text-gray-600 mt-1">System overview and management</p>
    </div>
  
    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Stat title="Total Transactions" value={transactionStats.total.toLocaleString()} change={5.2} icon="chart-up" />
      <Stat title="Verified Transactions" value={transactionStats.verified.toLocaleString()} change={3.8} icon="check-circle" color="green" />
      <Stat title="Pending Verification" value={transactionStats.pending.toLocaleString()} change={-2.3} icon="clock" color="yellow" />
      <Stat title="Flagged Transactions" value={transactionStats.flagged.toLocaleString()} change={8.1} icon="alert" color="red" />
    </div>
  
    <!-- Main Dashboard Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Transaction Overview Card -->
        <Card title="Transaction Activity" icon="chart">
          <div class="h-[300px]">
            <Chart type="line" data={transactionChartData} />
          </div>
        </Card>
  
        <!-- Recent Issues Card -->
        <Card title="Recent Issues" icon="alert">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each recentIssues as issue}
                  <tr>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{issue.id}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{issue.description}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <Badge text={issue.status} type={getStatusColor(issue.status)} />
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{issue.timestamp}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <Button size="sm" variant="outline">Review</Button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <div class="mt-4 flex justify-end">
            <Button variant="outline" icon="arrow-right" iconPosition="right">View All Issues</Button>
          </div>
        </Card>
      </div>
  
      <!-- Right Column -->
      <div class="space-y-6">
        <!-- System Health Card -->
        <Card title="System Health" icon="check">
          <div class="space-y-4">
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-sm text-gray-600">System Uptime</span>
              <span class="text-sm font-medium text-gray-900">{systemHealth.uptime}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-sm text-gray-600">Avg. Response Time</span>
              <span class="text-sm font-medium text-gray-900">{systemHealth.responseTime}</span>
            </div>
            <div class="flex justify-between items-center border-b border-gray-100 pb-2">
              <span class="text-sm text-gray-600">Active Nodes</span>
              <span class="text-sm font-medium text-gray-900">{systemHealth.activeNodes}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Last System Backup</span>
              <span class="text-sm font-medium text-gray-900">{systemHealth.lastBackup}</span>
            </div>
          </div>
        </Card>
  
        <!-- Issue Status Chart -->
        <Card title="Issue Status" icon="chart">
          <div class="h-[200px] mb-2">
            <Chart type="doughnut" data={issueStatusData} />
          </div>
        </Card>
  
        <!-- Recent Users -->
        <Card title="Recent Users" icon="list">
          <div class="divide-y divide-gray-100">
            {#each recentUsers as user}
              <div class="py-3 flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-gray-900">{user.name}</p>
                  <div class="flex items-center mt-1">
                    <Badge text={user.type} type={getUserTypeBadge(user.type)} />
                    <span class="text-xs text-gray-500 ml-2">{user.lastActive}</span>
                  </div>
                </div>
                <Badge text={user.status} type={getStatusColor(user.status)} />
              </div>
            {/each}
          </div>
          <div class="mt-4 flex justify-end">
            <Button variant="outline" icon="arrow-right" iconPosition="right">Manage Users</Button>
          </div>
        </Card>
      </div>
    </div>
  
    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- User Growth Chart -->
      <Card title="User Growth" icon="chart">
        <div class="h-[250px]">
          <Chart type="line" data={userGrowthData} />
        </div>
      </Card>
  
      <!-- User Distribution Chart -->
      <Card title="User Distribution" icon="chart">
        <div class="h-[250px]">
          <Chart type="bar" data={userActivityData} />
        </div>
      </Card>
    </div>
  </div>