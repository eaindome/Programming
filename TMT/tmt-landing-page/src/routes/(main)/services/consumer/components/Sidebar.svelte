<script lang="ts">
  // @ts-ignore
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Logo from './ui/Logo.svelte';
  
  export let sidebarOpen: boolean;
  export let data: any = { user: { role: 'admin' } };
  
  let loaded = false;
  let navItems: { label: string; href: string; icon: string }[] = [];
  let userInitials = '';
  
  onMount(() => {
    // Add a small delay to ensure data is properly loaded and processed
    setTimeout(() => {
      loaded = true;
      
      // Get user initials for avatar
      if (data?.user?.name) {
        userInitials = data.user.name
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2);
      }
    }, 300);
  });
  
  $: {
    navItems = [
      { label: 'Dashboard', href: '/consumer', icon: 'home' },
      { label: 'Verify Product', href: '/consumer/verify', icon: 'check-circle' },
      { label: 'History', href: '/consumer/history', icon: 'clock' },
      { label: 'Report Issue', href: '/consumer/report', icon: 'flag' },
    ];
  }
</script>

<aside class={`bg-gradient-to-b from-[#1A5F7A] to-[#164d63] text-white w-64 transition-all duration-300 ease-in-out shadow-lg
               ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
               md:relative md:translate-x-0 fixed h-full z-10 flex flex-col`}>
  <!-- Logo section with subtle background -->
  <div class="p-4 border-b border-[#ffffff22] bg-[#13465a] backdrop-blur-sm">
    <div class="flex items-center">
      <Logo />
      {#if data?.user?.role}
        <span class="ml-2 text-xs font-medium px-2 py-1 rounded bg-[#ffffff22] text-white">
          {data.user.role}
        </span>
      {/if}
    </div>
  </div>
  
  <!-- Loading state -->
  {#if !loaded}
    <div class="flex-1 flex items-center justify-center">
      <div class="animate-pulse flex flex-col w-full px-4">
        {#each Array(5) as _, i}
          <div class="h-12 bg-[#ffffff11] rounded-lg mb-2"></div>
        {/each}
      </div>
    </div>
  {:else}
    <!-- Navigation Menu -->
    <nav class="p-4 flex-1 overflow-y-auto custom-scrollbar">
      <div class="mb-6">
        <h3 class="px-3 text-xs uppercase font-bold text-[#ffffffaa] tracking-wider">
          Main Menu
        </h3>
        <ul class="mt-2 space-y-1">
          {#each navItems as item, i}
            <li in:fly={{ y: 10, delay: i * 50, duration: 200 }}>
              <a 
                href={item.href} 
                class={`flex items-center p-3 rounded-lg text-sm font-medium transition-all
                       hover:translate-x-1 duration-200
                       ${$page.url.pathname === item.href || $page.url.pathname.startsWith(item.href + '/') 
                         ? 'bg-[#ffffff22] text-white shadow-sm' 
                         : 'text-[#ffffffdd] hover:bg-[#ffffff11] hover:text-white'}`}
              >
                <span class="mr-3 flex-shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {#if item.icon === 'home'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    {:else if item.icon === 'package'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                    {:else if item.icon === 'plus-circle'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    {:else if item.icon === 'alert-triangle'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    {:else if item.icon === 'list'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    {:else if item.icon === 'box'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    {:else if item.icon === 'download'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    {:else if item.icon === 'upload'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
                    {:else if item.icon === 'clock'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    {:else if item.icon === 'activity'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    {:else if item.icon === 'users'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    {:else if item.icon === 'alert-circle'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    {:else if item.icon === 'file-text'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    {:else if item.icon === 'check-circle'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    {:else if item.icon === 'flag'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                    {/if}
                  </svg>
                </span>
                <span class="truncate">{item.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </nav>
  {/if}
  
  <!-- Footer section -->
  <div class="p-4 border-t border-[#ffffff22] bg-[#13465a] mt-auto">
    <!-- User profile summary -->
    {#if data?.user}
      <div class="flex items-center mb-3 px-2">
        <div class="w-8 h-8 rounded-full bg-[#56C271] flex items-center justify-center text-sm font-medium mr-2">
          {userInitials || '?'}
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium text-white truncate">{data.user.name || 'User'}</p>
          <p class="text-xs text-[#ffffffaa] truncate">{data.user.email || ''}</p>
        </div>
      </div>
    {/if}
    
    <!-- Action links -->
    <div class="space-y-1">
      <a href="/settings" class="flex items-center p-2 rounded-lg text-sm font-medium text-[#ffffffcc] hover:bg-[#ffffff11] hover:text-white transition-colors">
        <span class="mr-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </span>
        Settings
      </a>
      <a href="/logout" class="flex items-center p-2 rounded-lg text-sm font-medium text-[#ffffffcc] hover:bg-[#ffffff11] hover:text-white transition-colors">
        <span class="mr-3">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </span>
        Logout
      </a>
    </div>
  </div>
</aside>

<style>
/* Custom scrollbar for the navigation */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

/* Additional enhancements */
@keyframes slideIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

nav ul li a:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>