<script lang="ts">
  // @ts-ignore
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import AuthLayout from '../../../components/layouts/AuthLayout.svelte';
  import Button from '../../../components/ui/Button.svelte';
  
  let visible = false;
  
  onMount(() => {
    // Small delay for better animation effect
    setTimeout(() => {
      visible = true;
    }, 100);
  });
  
  function handleContinue() {
    goto('/dashboard');
  }
</script>

<AuthLayout title="Email verified successfully!" subtitle="">
  {#if visible}
    <div class="flex flex-col items-center py-6" in:fade={{ duration: 400 }}>
      <!-- Success icon with animation -->
      <div class="success-icon-container" in:fly={{ y: -20, duration: 600, delay: 200 }}>
        <svg class="h-20 w-20 text-[#56C271]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2.5" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            class="success-path" 
          />
        </svg>
      </div>
      
      <!-- Success message -->
      <div class="mt-6 text-center" in:fly={{ y: 20, duration: 500, delay: 400 }}>
        <h3 class="text-xl font-medium text-gray-800 mb-2">Your account is ready!</h3>
        <p class="text-gray-600 max-w-md mx-auto">
          Your email has been verified successfully. You can now use all the features of Track My Meds.
        </p>
      </div>
      
      <!-- Continue button -->
      <div class="mt-8 w-full max-w-xs" in:fly={{ y: 20, duration: 500, delay: 600 }}>
        <Button type="button" variant="secondary" fullWidth={true} on:click={handleContinue}>
          Continue to dashboard
        </Button>
      </div>
      
      <!-- Additional hint -->
      <p class="mt-4 text-sm text-gray-500" in:fade={{ delay: 800 }}>
        You'll find all your medications and reminders on your dashboard
      </p>
    </div>
  {/if}
</AuthLayout>

<style>
.success-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: rgba(86, 194, 113, 0.1);
  animation: pulse-success 2s infinite;
}

.success-path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw-check 1s ease forwards;
}

@keyframes draw-check {
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse-success {
  0% {
    box-shadow: 0 0 0 0 rgba(86, 194, 113, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(86, 194, 113, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(86, 194, 113, 0);
  }
}
</style>