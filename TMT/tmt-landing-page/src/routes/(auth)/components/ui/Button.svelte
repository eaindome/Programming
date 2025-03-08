<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "primary" | "secondary" | "outline" = "primary";
  export let fullWidth = false;
  export let disabled = false;
  export let loading = false;
  
  const variants = {
    primary: "bg-[#1A5F7A] hover:bg-[#164d63] text-white",
    secondary: "bg-[#56C271] hover:bg-[#45a55d] text-white",
    outline: "bg-white border border-[#1A5F7A] text-[#1A5F7A] hover:bg-gray-50"
  };
  
  const variantClass = variants[variant];
  const widthClass = fullWidth ? "w-full" : "";
</script>

<button 
  {type} 
  class="{variantClass} {widthClass} flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A5F7A] transition-all duration-300 ease-in-out mt-2 transform hover:scale-105 active:scale-95 hover:shadow-md"
  disabled={disabled || loading}
>
  <div class="flex items-center justify-center relative w-full h-full transition-all duration-300">
      <div class="absolute inset-0 flex items-center justify-center {loading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
      </div>
      <div class="{loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300">
          <slot />
      </div>
  </div>
</button>

<style>
  button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: scale(1) !important;
      box-shadow: none !important;
  }
  
  @keyframes pulse {
      0%, 100% {
          box-shadow: 0 0 0 0 rgba(26, 95, 122, 0.4);
      }
      50% {
          box-shadow: 0 0 0 6px rgba(26, 95, 122, 0);
      }
  }
  
  button:not(:disabled):hover {
      animation: pulse 2s infinite;
  }
</style>