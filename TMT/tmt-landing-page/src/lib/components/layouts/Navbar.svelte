<script>
    // @ts-ignore
    import { goto } from '$app/navigation';
    import { onMount, afterUpdate } from 'svelte';
    import { fade, slide, fly } from 'svelte/transition';
    
    let scrollY;
    let isScrolled = false;
    let mobileMenuOpen = false;
    let activeSection = 'home';
    
    // Handle mobile menu toggle
    const toggleMobileMenu = () => {
      mobileMenuOpen = !mobileMenuOpen;
    };
    
    // Handle scroll events and navbar transparency
    onMount(() => {
      const handleScroll = () => {
        scrollY = window.scrollY;
        isScrolled = scrollY > 20;
        
        // Determine active section based on scroll position
        const sections = ['features-section', 'how-it-works', 'pricing', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              activeSection = section;
              break;
            } else if (scrollY < 100) {
              activeSection = 'home';
            }
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

    const navigateToSignup = () => {
      goto('/signup');
    };
</script>
  
<nav class="fixed w-full z-50 transition-all duration-300 {isScrolled ? 'bg-[#1A5F7A] shadow-lg' : 'bg-transparent'}" 
       style="backdrop-filter: {isScrolled ? 'blur(8px)' : 'none'}">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <a href="/" 
             class="flex items-center transition-all duration-300 transform hover:scale-105">
            <span class="text-xl font-bold text-white">Track My Meds</span>
          </a>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="flex items-center space-x-8">
            {#each [
              { name: 'Home', href: '#', id: 'home' },
              { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
              { name: 'Features', href: '#features-section', id: 'features-section' },
            //   { name: 'Pricing', href: '#pricing', id: 'pricing' },
              { name: 'Contact', href: '#contact', id: 'contact' }
            ] as item}
              <a href={item.href} 
                 data-scroll-to={item.id}
                 class="text-white hover:text-gray-200 transition-all duration-300 relative {activeSection === item.id ? 'font-medium' : ''}">
                {item.name}
                {#if activeSection === item.id}
                  <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-[#56C271] transform transition-all duration-300" 
                        in:slide={{duration: 300, axis: 'x'}}></span>
                {/if}
              </a>
            {/each}
          </div>
        </div>
        
        <!-- Get Started Button -->
        <div class="hidden md:block">
          <button
            on:click={navigateToSignup} 
            class="bg-[#56C271] hover:bg-[#4aad61] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button on:click={toggleMobileMenu}
                  class="text-white hover:text-gray-200 focus:outline-none transition-transform duration-300 {mobileMenuOpen ? 'rotate-90' : ''}"
                  aria-label="Mobile menu button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {#if !mobileMenuOpen}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              {/if}
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu with animation -->
      {#if mobileMenuOpen}
        <div in:slide={{ duration: 300 }} out:slide={{ duration: 300 }} class="md:hidden pb-4">
          <div class="flex flex-col space-y-4">
            {#each [
              { name: 'Home', href: '#', id: 'home' },
              { name: 'Features', href: '#features', id: 'features' },
              { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
              { name: 'Pricing', href: '#pricing', id: 'pricing' },
              { name: 'Contact', href: '#contact', id: 'contact' }
            ] as item, i}
              <a href={item.href}
                 data-scroll-to={item.id}
                 in:fly={{ y: -10, delay: i * 50, duration: 200 }}
                 class="text-white hover:text-gray-200 transition-all duration-300 {activeSection === item.id ? 'pl-2 border-l-2 border-[#56C271]' : ''}">
                {item.name}
              </a>
            {/each}
            <button in:fly={{ y: -10, delay: 250, duration: 200 }}
                    class="bg-[#56C271] hover:bg-[#4aad61] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 w-full hover:shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      {/if}
    </div>
</nav>