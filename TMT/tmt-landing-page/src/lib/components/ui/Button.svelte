<script lang="ts">
    export let primary = false;
    export let size: 'sm' | 'md' | 'lg' = 'md';
    export let href: string | null = null;
    
    // Styling based on props
    $: buttonClass = `
      inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
      ${primary 
        ? 'bg-[#56C271] hover:bg-[#4aad61] text-white shadow-lg hover:shadow-xl focus:ring-[#56C271]' 
        : 'bg-white hover:bg-gray-100 text-[#1A5F7A] shadow-lg hover:shadow-xl focus:ring-[#1A5F7A]'}
      ${size === 'sm' ? 'py-2 px-4 text-sm' : size === 'lg' ? 'py-4 px-8 text-lg' : 'py-3 px-6 text-base'}
    `;

    // Handle click event
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>
  
{#if href}
    <a {href} class={buttonClass}>
      <slot></slot>
    </a>
{:else}
    <button class={buttonClass} on:click={() => dispatch('click')}>
      <slot></slot>
    </button>
{/if}