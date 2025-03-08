<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Button from '$lib/components/ui/Button.svelte';
    
    let visible = false;
    
    onMount(() => {
      // Small delay for dramatic effect
      setTimeout(() => {
        visible = true;
      }, 300);
    });
</script>
  
<section class="bg-gradient-to-br from-[#1A5F7A] to-[#164e65] text-white relative overflow-hidden">
    <!-- Background particles for tech feel -->
    <div class="absolute inset-0 overflow-hidden opacity-10">
      {#each Array(20) as _, i}
        <div
          class="absolute bg-white rounded-full"
          style="
            width: {Math.random() * 10 + 2}px;
            height: {Math.random() * 10 + 2}px;
            left: {Math.random() * 100}%;
            top: {Math.random() * 100}%;
            animation: float {Math.random() * 10 + 20}s linear infinite;
          "
        ></div>
      {/each}
    </div>
  
    <div class="container mx-auto px-6 py-16 md:py-24 md:flex items-center justify-between relative z-10">
      {#if visible}
        <div class="md:w-1/2 md:pr-12" in:fade={{ duration: 800, delay: 300 }}>
          <div in:fly={{ y: 30, duration: 800, delay: 300 }}>
            <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Verify Your Medication's Journey with Confidence
            </h1>
          </div>
          <div in:fly={{ y: 30, duration: 800, delay: 500 }}>
            <p class="text-lg mb-8 text-gray-100">
              Track My Meds creates a secure, traceable digital passport for every medication, ensuring authenticity from manufacturer to you.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4" in:fly={{ y: 30, duration: 800, delay: 700 }}>
            <Button primary={true} size="lg">Get Started</Button>
            <Button primary={false} size="lg">Learn More</Button>
          </div>
        </div>
        
        <div class="md:w-1/2 mt-12 md:mt-0" in:fly={{ x: 30, duration: 1000, delay: 800 }}>
          <div class="rounded-lg bg-white p-4 shadow-xl transform transition-all duration-500 hover:rotate-1 hover:scale-105">
            <img src="/api/placeholder/600/500" alt="TMT Mobile App Demo" class="rounded w-full h-auto" />
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Wave Divider -->
    <div class="w-full overflow-hidden">
      <svg preserveAspectRatio="none" width="100%" height="50" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V74.0001H0V25.9086Z" fill="#F9FAFB"/>
      </svg>
    </div>
</section>
  
<style>
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
      }
      50% {
        transform: translateY(-20px) translateX(10px);
      }
      100% {
        transform: translateY(0) translateX(0);
      }
    }
    
    @keyframes wave {
      0% {
        transform: translateX(-2%);
      }
      50% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(2%);
      }
    }
</style>