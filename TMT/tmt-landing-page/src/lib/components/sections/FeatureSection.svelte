<script lang="ts">
    import FeatureItem from '$lib/components/layouts/FeatureItem.svelte';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
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
      
      const element = document.getElementById('features-section');
      if (element) observer.observe(element);
      
      return () => {
        if (element) observer.unobserve(element);
      };
    });
    
    const features = [
      {
        title: "Blockchain Verification",
        description: "Every scan is recorded on a secure, immutable blockchain for full transparency and traceability.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>'
      },
      {
        title: "Mobile Accessibility",
        description: "Verify medications via our mobile app or by sending a simple text message for areas with limited smartphone access.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>'
      },
      {
        title: "Instant Alerts",
        description: "Automatic notifications for any supply chain deviations or suspicious patterns detected in the system.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
      },
      {
        title: "Detailed Reports",
        description: "Access comprehensive information about your medication including batch number, expiration date, and complete supply chain history.",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
      }
    ];
</script>
  
<section id="features-section" class="py-16 bg-white">
    <div class="container mx-auto px-6">
      {#if isVisible}
        <div in:fade={{ duration: 500 }}>
          <h2 
            class="text-3xl md:text-4xl font-bold text-center text-[#1A5F7A] mb-12"
            in:fly={{ y: 20, duration: 800 }}
          >
            Key Features
          </h2>
        
          <div class="grid md:grid-cols-2 gap-12">
            {#each features as feature, i}
              <FeatureItem 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon} 
                delay={i * 150}
              />
            {/each}
          </div>
        </div>
      {/if}
    </div>
</section>