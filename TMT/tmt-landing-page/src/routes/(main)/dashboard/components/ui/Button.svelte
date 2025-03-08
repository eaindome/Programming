<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
    export let size: 'sm' | 'md' | 'lg' = 'md';
    export let disabled: boolean = false;
    export let fullWidth: boolean = false;
    export let icon: string = '';
    export let iconPosition: 'left' | 'right' = 'left';
    
    const variantClasses = {
      primary: 'bg-[#1A5F7A] hover:bg-[#154a5e] text-white',
      secondary: 'bg-[#56C271] hover:bg-[#4aad62] text-white',
      outline: 'bg-white border border-[#1A5F7A] text-[#1A5F7A] hover:bg-[#1A5F7A]/5',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    };
    
    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-4 text-sm',
      lg: 'py-2.5 px-5 text-base'
    };
  </script>
  
  <button 
    {type} 
    class={`rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5F7A] 
            ${variantClasses[variant]} 
            ${sizeClasses[size]} 
            ${fullWidth ? 'w-full' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    {disabled}
    on:click
  >
    {#if icon && iconPosition === 'left'}
      <svg class="w-5 h-5 mr-2 -ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {#if icon === 'plus'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        {:else if icon === 'check'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        {:else if icon === 'x'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        {:else if icon === 'download'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        {:else if icon === 'upload'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
        {/if}
      </svg>
    {/if}
    
    <slot />
    
    {#if icon && iconPosition === 'right'}
      <svg class="w-5 h-5 ml-2 -mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {#if icon === 'plus'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        {:else if icon === 'check'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        {:else if icon === 'x'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        {:else if icon === 'arrow-right'}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        {/if}
      </svg>
    {/if}
</button>