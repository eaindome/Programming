<script lang="ts">
    export let toggleSidebar: () => void;
    export let user: any = {};
    
    let notifications = [
      { id: 1, text: 'New transaction recorded', time: '5m ago', read: false },
      { id: 2, text: 'Batch XYZ123 verification complete', time: '1h ago', read: false },
      { id: 3, text: 'System update scheduled for tonight', time: '3h ago', read: true }
    ];
    
    let showNotifications = false;
    let showUserMenu = false;
    
    function toggleNotifications() {
      showNotifications = !showNotifications;
      if (showNotifications) showUserMenu = false;
    }
    
    function toggleUserMenu() {
      showUserMenu = !showUserMenu;
      if (showUserMenu) showNotifications = false;
    }
  </script>
  
  <header class="bg-white border-b border-[#E2E8F0] py-4 px-6 flex items-center justify-between">
    <div class="flex items-center">
      <button 
        class="text-gray-600 md:hidden mr-4" 
        on:click={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-800">Track My Meds</h1>
    </div>
    
    <div class="flex items-center space-x-4">
      <div class="relative">
        <button 
          class="text-gray-600 hover:text-gray-800" 
          on:click={toggleNotifications}
          aria-label="Notifications"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          {#if notifications.some(n => !n.read)}
            <span class="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
              {notifications.filter(n => !n.read).length}
            </span>
          {/if}
        </button>
        
        {#if showNotifications}
          <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-[#E2E8F0]">
            <div class="px-4 py-2 border-b border-[#E2E8F0] flex justify-between items-center">
              <h3 class="font-medium text-gray-800">Notifications</h3>
              <button class="text-xs text-[#1A5F7A] hover:underline">Mark all as read</button>
            </div>
            <div class="max-h-64 overflow-y-auto">
              {#each notifications as notification}
                <div class="px-4 py-3 hover:bg-gray-50 border-b border-[#E2E8F0] last:border-0">
                  <div class="flex items-start">
                    <div class={`w-2 h-2 rounded-full mt-1.5 mr-2 ${notification.read ? 'bg-gray-300' : 'bg-[#56C271]'}`}></div>
                    <div>
                      <p class="text-sm text-gray-800">{notification.text}</p>
                      <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            <div class="px-4 py-2 border-t border-[#E2E8F0]">
              <a href="/notifications" class="text-xs text-[#1A5F7A] hover:underline block text-center">
                View all notifications
              </a>
            </div>
          </div>
        {/if}
      </div>
      
      <div class="relative">
        <button 
          class="flex items-center space-x-2" 
          on:click={toggleUserMenu}
          aria-label="User menu"
        >
          <div class="w-8 h-8 rounded-full bg-[#1A5F7A] flex items-center justify-center text-white">
            {#if user?.name}
              {user.name.charAt(0)}
            {:else}
              U
            {/if}
          </div>
          <span class="text-sm font-medium text-gray-700 hidden md:block">
            {user?.name || 'User'}
          </span>
          <svg class="w-4 h-4 text-gray-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {#if showUserMenu}
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-[#E2E8F0]">
            <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Your Profile
            </a>
            <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <div class="border-t border-[#E2E8F0] my-1"></div>
            <a href="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </a>
          </div>
        {/if}
      </div>
    </div>
  </header>