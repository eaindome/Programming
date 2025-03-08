<script lang="ts">
  export let text: string;
  export let type: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary' | 'secondary' = 'default';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let icon: string | null = null;
  export let dismissible: boolean = false;
  export let pulse: boolean = false;
  export let outline: boolean = false;
  
  // Event dispatcher for dismiss event
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  // Base styling
  const baseClasses = "inline-flex items-center justify-center font-medium border rounded-full transition-all";
  
  // Size variations
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };
  
  // Type styles with improved color palette
  const typeClasses = {
    success: outline 
      ? "bg-transparent text-emerald-600 border-emerald-600" 
      : "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: outline 
      ? "bg-transparent text-amber-600 border-amber-600" 
      : "bg-amber-50 text-amber-700 border-amber-100",
    error: outline 
      ? "bg-transparent text-rose-600 border-rose-600" 
      : "bg-rose-50 text-rose-700 border-rose-100",
    info: outline 
      ? "bg-transparent text-blue-600 border-blue-600" 
      : "bg-blue-50 text-blue-700 border-blue-100",
    primary: outline 
      ? "bg-transparent text-violet-600 border-violet-600" 
      : "bg-violet-50 text-violet-700 border-violet-100",
    secondary: outline 
      ? "bg-transparent text-indigo-600 border-indigo-600" 
      : "bg-indigo-50 text-indigo-700 border-indigo-100",
    default: outline 
      ? "bg-transparent text-gray-600 border-gray-600" 
      : "bg-gray-50 text-gray-700 border-gray-100"
  };
  
  // Animation classes
  $: animationClasses = pulse ? "animate-pulse" : "";
  
  // Hover effects
  $: hoverClasses = dismissible || outline ? "hover:bg-opacity-10 hover:bg-gray-200" : "";
  
  // Get the complete class string
  $: classes = `${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${animationClasses} ${hoverClasses}`;
  
  // Handle dismiss click
  function handleDismiss(event: MouseEvent) {
    event.stopPropagation();
    dispatch('dismiss');
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span class={classes} on:click>
  {#if icon}
      <span class="mr-1 -ml-0.5">
          <svg class={size === 'sm' ? "w-3 h-3" : size === 'md' ? "w-3.5 h-3.5" : "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {#if icon === 'check'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              {:else if icon === 'info'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              {:else if icon === 'warning'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              {:else if icon === 'error'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              {:else if icon === 'clock'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              {/if}
          </svg>
      </span>
  {/if}
  {text}
  {#if dismissible}
      <button 
          class="ml-1.5 -mr-1 rounded-full hover:bg-gray-200 hover:bg-opacity-50 p-0.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400" 
          on:click={handleDismiss}
          aria-label="Dismiss"
      >
          <svg class={size === 'sm' ? "w-2.5 h-2.5" : size === 'md' ? "w-3 h-3" : "w-3.5 h-3.5"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
  {/if}
</span>