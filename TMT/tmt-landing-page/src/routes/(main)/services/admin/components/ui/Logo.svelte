<script lang="ts">
    export let size: 'sm' | 'md' | 'lg' = "md";
    
    const sizes: { [key in 'sm' | 'md' | 'lg']: string } = {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16"
    };
    
    const sizeClass = sizes[size] || sizes.md;
</script>
  
<div class="flex items-center">
    <svg class="{sizeClass}" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="10" fill="#1A5F7A" />
      <path d="M15 25L22 32L35 18" stroke="#56C271" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M25 15V35" stroke="#56C271" stroke-width="3" stroke-linecap="round" />
      <path d="M15 25H35" stroke="#56C271" stroke-width="3" stroke-linecap="round" />
    </svg>
    <span class="ml-3 text-2xl font-bold text-[#1A5F7A]">Track My Meds</span>
</div>