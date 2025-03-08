<script lang="ts">
  export let title: string;
  export let value: string | number;
  export let change: number | null = null;
  export let icon: string = '';
  export let color: keyof typeof colors = 'blue';
  export let subtitle: string = 'vs last month';
  export let loading: boolean = false;
  
  const colors = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100',
    green: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    red: 'text-rose-600 bg-rose-50 border-rose-100',
    yellow: 'text-amber-600 bg-amber-50 border-amber-100',
    purple: 'text-violet-600 bg-violet-50 border-violet-100',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  // Animation values for the change indicator
  $: changeClass = change === null ? '' : change >= 0 ? 'text-emerald-600' : 'text-rose-600';
  $: changeIcon = change === null ? '' : change >= 0 ? 'arrow-up' : 'arrow-down';
  
  // Format large numbers with k, M, B suffixes
  function formatValue(val: number | string): string {
    if (typeof val === 'string') return val;
    
    if (val >= 1000000000) {
      return (val / 1000000000).toFixed(1) + 'B';
    } else if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    } else if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k';
    }
    return val.toString();
  }
</script>

<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden">
  {#if loading}
    <div class="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
      <div class="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  {/if}
  
  <div class="flex items-start">
    {#if icon}
      <div class={`${colors[color]} p-3 rounded-lg mr-4 flex-shrink-0 border`}>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {#if icon === 'chart-up'}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          {:else if icon === 'package'}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
          {:else if icon === 'check-circle'}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          {:else if icon === 'alert'}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          {:else if icon === 'clock'}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          {/if}
        </svg>
      </div>
    {/if}
    <div class="flex-1">
      <div class="flex justify-between items-start">
        <p class="text-sm font-medium text-gray-500">{title}</p>
        {#if change !== null}
          <div class={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeClass} bg-opacity-10 ${change >= 0 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {#if change >= 0}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              {/if}
            </svg>
            {Math.abs(change)}%
          </div>
        {/if}
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mt-1 mb-2">{typeof value === 'number' ? formatValue(value) : value}</h3>
      {#if change !== null}
        <div class="flex items-center mt-1">
          <div class="w-full bg-gray-200 rounded-full h-1.5">
            <div class={`h-1.5 rounded-full ${change >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={`width: ${Math.min(Math.abs(change), 100)}%`}></div>
          </div>
          <span class="text-gray-400 text-xs ml-2">{subtitle}</span>
        </div>
      {/if}
    </div>
  </div>
</div>
  