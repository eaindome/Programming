<!-- src/routes/+page.svelte -->
<script lang="ts">
    import Navbar from '$lib/components/layouts/Navbar.svelte';
    import HeroSection from '$lib/components/sections/HeroSection.svelte';
    import HowItWorksSection from '$lib/components/sections/HowItWorksSection.svelte';
    import FeaturesSection from '$lib/components/sections/FeatureSection.svelte';
    import CTASection from '$lib/components/sections/CTAsection.svelte';
    import Footer from '$lib/components/sections/Footer.svelte';
    import { onMount } from 'svelte';
    
    // Smooth scroll for navigation
    onMount(() => {
      const scrollToSection = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.hasAttribute('data-scroll-to')) {
          e.preventDefault();
          const sectionId = target.getAttribute('data-scroll-to');
          const section = document.getElementById(sectionId || '');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      
      document.body.addEventListener('click', scrollToSection);
      
      return () => {
        document.body.removeEventListener('click', scrollToSection);
      };
    });
</script>
  
<svelte:head>
    <title>Track My Meds | Secure Medication Verification</title>
    <meta name="description" content="Track My Meds creates a secure, traceable digital passport for every medication package, ensuring authenticity from manufacturer to consumer." />
</svelte:head>
  
<main class="font-sans text-gray-800">
    <Navbar />
    <HeroSection />
    <HowItWorksSection />
    <FeaturesSection />
    <CTASection />
    <Footer />
</main>
  
<style>
    :global(body) {
      background-color: #F9FAFB;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      overflow-x: hidden;
    }
    
    :global(html) {
      scroll-behavior: smooth;
    }
</style>