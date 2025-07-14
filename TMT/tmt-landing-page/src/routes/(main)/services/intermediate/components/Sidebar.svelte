<script lang="ts">
  // @ts-ignore
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Logo from './ui/Logo.svelte';
  
  export let sidebarOpen: boolean;
  export let data: any = { user: { role: 'intermediate' } };
  
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
        { label: 'Dashboard', href: '/dashboard', icon: 'home' },
        { label: 'Purchase Drugs', href: '/purchase', icon: 'shopping-cart' },
        { label: 'Inventory', href: '/inventory', icon: 'box' },
        { label: 'Sell Drugs', href: '/sell', icon: 'tag' },
        { label: 'Verify Drugs', href: '/verify', icon: 'search' },
        { label: 'Transactions', href: '/transactions', icon: 'file-text' },
        { label: 'Profile & Settings', href: '/profile', icon: 'settings' },
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
        {#each Array(7) as _, i}
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
                    {:else if item.icon === 'shopping-cart'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    {:else if item.icon === 'box'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    {:else if item.icon === 'tag'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    {:else if item.icon === 'search'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    {:else if item.icon === 'file-text'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    {:else if item.icon === 'settings'}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
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
    
    <!-- Logout link -->
    <div class="space-y-1">
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