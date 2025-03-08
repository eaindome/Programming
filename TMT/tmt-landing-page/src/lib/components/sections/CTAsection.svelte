<!-- src/lib/components/CTASection.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Button from '$lib/components/ui/Button.svelte';
    
    let isVisible = false;
    
    onMount(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            isVisible = true;
          }
        },
        { threshold: 0.1 }
      );
      
      const element = document.getElementById('cta-section');
      if (element) observer.observe(element);
      
      return () => {
        if (element) observer.unobserve(element);
      };
    });
</script>
  
<section id="cta-section" class="bg-[#1A5F7A] text-white py-16 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      {#each Array(5) as _, i}
        <div 
          class="absolute bg-white opacity-5 rounded-full"
          style="
            width: {Math.random() * 300 + 100}px;
            height: {Math.random() * 300 + 100}px;
            left: {Math.random() * 100}%;
            top: {Math.random() * 100}%;
            animation: pulse {Math.random() * 8 + 12}s infinite alternate ease-in-out;
          "
        ></div>
      {/each}
    </div>
  
    <div class="container mx-auto px-6 text-center relative z-10">
      {#if isVisible}
        <h2 
          class="text-3xl md:text-4xl font-bold mb-6"
          in:fly={{ y: 30, duration: 800 }}
        >
          Ready to Verify Your Medications?
        </h2>
        
        <p 
          class="text-lg mb-8 max-w-2xl mx-auto"
          in:fly={{ y: 30, duration: 800, delay: 200 }}
        >
          Join thousands of users who trust Track My Meds to verify the authenticity and safety of their medications.
        </p>
        
        <div 
          class="flex flex-col sm:flex-row justify-center gap-4"
          in:fade={{ duration: 500, delay: 400 }}
        >
          <div in:fly={{ y: 20, duration: 500, delay: 400 }}>
            <Button primary={true} size="lg">Download the App</Button>
          </div>
          <div in:fly={{ y: 20, duration: 500, delay: 600 }}>
            <Button primary={false} size="lg">Contact Sales</Button>
          </div>
        </div>
      {/if}
    </div>
</section>
  
<style>
    @keyframes pulse {
      0% {
        transform: scale(0.8) translate(0, 0);
        opacity: 0.05;
      }
      100% {
        transform: scale(1.2) translate(50px, -30px);
        opacity: 0.1;
      }
    }
</style>