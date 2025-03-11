<script lang="ts">
    export let history: Array<{
      timestamp: string;
      actor: string;
      action: string;
      location: string;
      conditions?: {
        temperature: string;
        humidity: string;
      }
    }>;
    
    // Function to format date
    function formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleString();
    }
  </script>
  
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-xl font-semibold text-[#1A5F7A] mb-4">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Blockchain Transaction History
      </div>
    </h3>
    
    <div class="relative">
      <!-- Supply Chain Timeline -->
      <div class="ml-6 pl-6 border-l-2 border-[#1A5F7A]">
        {#each history as transaction, i}
          <div class="mb-8 relative">
            <!-- Dot marker -->
            <div class="absolute -left-9 mt-1">
              <div class="bg-[#1A5F7A] h-6 w-6 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-bold">{i + 1}</span>
              </div>
            </div>
            
            <!-- Transaction card -->
            <div class="bg-[#E2E8F0] bg-opacity-50 p-4 rounded-lg">
              <div class="flex justify-between mb-2">
                <span class="font-semibold text-[#1A5F7A]">{transaction.action}</span>
                <span class="text-gray-600 text-sm">{transaction.timestamp}</span>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-500 text-sm mb-1">Handler</p>
                  <p>{transaction.actor}</p>
                </div>
                <div>
                  <p class="text-gray-500 text-sm mb-1">Location</p>
                  <p>{transaction.location}</p>
                </div>
              </div>
              
              {#if transaction.conditions}
                <div class="mt-3 pt-3 border-t border-gray-200">
                  <p class="text-gray-500 text-sm mb-1">Environmental Conditions</p>
                  <div class="flex space-x-4">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Temp: {transaction.conditions.temperature}</span>
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <span>Humidity: {transaction.conditions.humidity}</span>
                  </div>
                </div>
              </div>
            {/if}
            
            <!-- Verification Badge - only for the first (production) and last (pharmacy) entries -->
            {#if i === 0 || i === history.length - 1}
              <div class="mt-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#56C271] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Blockchain Verified
                </span>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Security Features -->
  <div class="mt-6 p-4 bg-[#1A5F7A] bg-opacity-10 rounded-lg">
    <h4 class="font-semibold text-[#1A5F7A] mb-2">Blockchain Security Features</h4>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#1A5F7A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
        <span>Tamper-proof records</span>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#1A5F7A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Cryptographic verification</span>
      </div>
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#1A5F7A] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Decentralized validation</span>
      </div>
    </div>
  </div>
</div>