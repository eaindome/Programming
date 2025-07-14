<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  export let title: string = '';
  export let icon: string = '';
  export let padding: boolean = true;
  export let variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';
  export let loading: boolean = false;
  export let collapsible: boolean = false;
  export let defaultCollapsed: boolean = false;
  
  let isVisible = false;
  let isCollapsed = defaultCollapsed;
  let cardElement: HTMLElement;
  let isHovered = false;
  
  // Variant styles
  const variantStyles = {
    default: {
      header: 'border-[#E2E8F0] bg-white',
      icon: 'text-[#1A5F7A]',
      title: 'text-gray-800',
      card: 'bg-white border-[#E2E8F0]'
    },
    primary: {
      header: 'border-[#d0e1e9] bg-[#f0f7fa]',
      icon: 'text-[#1A5F7A]',
      title: 'text-[#1A5F7A]',
      card: 'bg-white border-[#d0e1e9]'
    },
    success: {
      header: 'border-[#d1e7c7] bg-[#f4faf1]',
      icon: 'text-[#56C271]',
      title: 'text-[#2e9747]',
      card: 'bg-white border-[#d1e7c7]'
    },
    warning: {
      header: 'border-[#ffe8cc] bg-[#fff9f0]',
      icon: 'text-[#f59e0b]',
      title: 'text-[#b45309]',
      card: 'bg-white border-[#ffe8cc]'
    },
    danger: {
      header: 'border-[#fedcdc] bg-[#fff5f5]', 
      icon: 'text-[#ef4444]',
      title: 'text-[#b91c1c]',
      card: 'bg-white border-[#fedcdc]'
    }
  };
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
  });
  
  function toggleCollapse() {
    if (collapsible) {
      isCollapsed = !isCollapsed;
    }
  }
</script>

{#if isVisible}
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
class="rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out mb-6 {variantStyles[variant].card} border hover:shadow-md {isHovered ? 'translate-y-[-2px]' : ''}"
in:fly={{ y: 20, duration: 300 }}
bind:this={cardElement}
on:mouseenter={() => isHovered = true}
on:mouseleave={() => isHovered = false}
>
  {#if title}
    <div class="border-b px-4 py-3 flex items-center justify-between {variantStyles[variant].header} transition-colors duration-300">
      <div class="flex items-center">
        {#if icon}
          <span class="mr-3 {variantStyles[variant].icon} transition-transform duration-300 {isHovered ? 'scale-110' : ''}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {#if icon === 'chart'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              {:else if icon === 'alert'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              {:else if icon === 'check'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              {:else if icon === 'package'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
              {:else if icon === 'list'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              {/if}
            </svg>
          </span>
        {/if}
        <h2 class="font-medium {variantStyles[variant].title}">{title}</h2>
      </div>
      
      {#if collapsible}
        <button 
          class="p-1 rounded-md hover:bg-[#00000010] transition-colors duration-200 focus:outline-none"
          on:click={toggleCollapse}
          aria-label={isCollapsed ? "Expand" : "Collapse"}
        >
          <svg 
            class="w-5 h-5 text-gray-500 transition-transform duration-300 {isCollapsed ? '' : 'rotate-180'}" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      {/if}
    </div>
  {/if}
  
  {#if !isCollapsed}
    <div 
      class={padding ? 'p-4' : ''}
      transition:fade={{ duration: 200 }}
    >
      {#if loading}
        <div class="animate-pulse space-y-4">
          <div class="h-4 bg-gray-200 rounded-md w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded-md"></div>
          <div class="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
      {:else}
        <slot />
      {/if}
    </div>
  {/if}
</div>
{/if}

<style>
/* Add frosted glass effect for active cards with primary variant */
.bg-primary {
  backdrop-filter: blur(4px);
}

/* Add subtle shine effect on hover */
div:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shine 1.5s infinite;
  pointer-events: none;
}

@keyframes shine {
  to {
    left: 200%;
  }
}
</style>