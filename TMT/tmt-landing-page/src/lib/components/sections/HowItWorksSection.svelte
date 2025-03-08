<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
  
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
      
      const element = document.getElementById('how-it-works');
      if (element) observer.observe(element);
      
      return () => {
        if (element) observer.unobserve(element);
      };
    });
    
    const steps = [
      {
        number: 1,
        title: "Scan Package",
        description: "Each medication package has a unique QR code that you can scan with our mobile app or send via text message."
      },
      {
        number: 2,
        title: "Verify Chain",
        description: "Our blockchain technology verifies that your medication followed the proper supply chain path from manufacturer to pharmacy."
      },
      {
        number: 3,
        title: "Instant Results",
        description: "Get immediate confirmation of your medication's authenticity or warning of potential issues within seconds."
      }
    ];
  </script>
  
  <section id="how-it-works" class="bg-[#F9FAFB] py-16">
    <div class="container mx-auto px-6">
      {#if isVisible}
        <h2 
          class="text-3xl md:text-4xl font-bold text-center text-[#1A5F7A] mb-12"
          in:fly={{ y: -20, duration: 800 }}
        >
          How Track My Meds Works
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8 relative">
          <!-- Connection line for desktop -->
          <div class="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-1 bg-gray-200 z-0"></div>
          
          {#each steps as step, i}
            <div 
              in:fade={{ delay: 300 + i * 200, duration: 800 }}
              class="relative z-10"
            >
              <div 
                class="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#1A5F7A] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                in:scale={{ 
                  delay: 300 + i * 200, 
                  duration: 600,
                  start: 0.8,
                  opacity: 0,
                  easing: elasticOut
                }}
              >
                <div class="w-12 h-12 bg-[#1A5F7A] rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {step.number}
                </div>
                <h3 class="text-xl font-semibold mb-4 text-[#1A5F7A]">{step.title}</h3>
                <p class="text-gray-700">{step.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
</section>