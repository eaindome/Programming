<script lang="ts">
  export let title: string;
  export let description: string;
  export let icon: string;
  export let delay: number = 0;
  
  import { fade, fly } from 'svelte/transition';
  import { spring } from 'svelte/motion';
  
  let isHovered = false;
  
  // Spring animation for icon
  const iconSpring = spring({ scale: 1, rotate: 0 }, {
    stiffness: 0.1,
    damping: 0.4
  });
  
  $: if (isHovered) {
    iconSpring.set({ scale: 1.2, rotate: 5 });
  } else {
    iconSpring.set({ scale: 1, rotate: 0 });
  }
</script>

<div
  class="flex"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
  role="listitem"
  aria-label={title}
  in:fly={{ y: 20, duration: 500, delay }}
>
  <div class="mr-4">
    <div
      class="w-12 h-12 bg-[#56C271] rounded-lg flex items-center justify-center text-white transition-all duration-300"
      style="transform: scale({$iconSpring.scale}) rotate({$iconSpring.rotate}deg);"
    >
      {@html icon}
    </div>
  </div>
  <div class="">
    <h3 class="text-xl font-semibold mb-2 text-[#1A5F7A]">{title}</h3>
    <p class="text-gray-700">{description}</p>
  </div>
</div>