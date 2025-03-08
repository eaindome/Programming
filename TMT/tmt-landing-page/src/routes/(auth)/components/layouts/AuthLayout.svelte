<script lang="ts">
    import Logo from '../ui/Logo.svelte';
    
    export let title: string;
    export let subtitle: string = '';
</script>
  
<div class="min-h-screen bg-[#F9FAFB] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <Logo />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      {#if subtitle}
        <p class="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      {/if}
    </div>
  
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[#E2E8F0]">
        <slot />
      </div>
    </div>
</div>