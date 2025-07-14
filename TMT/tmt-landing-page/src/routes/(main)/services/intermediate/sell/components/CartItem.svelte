<!-- src/lib/components/CartItem.svelte -->
<script lang="ts">
  export let id: string;
  export let name: string;
  export let dosage: string;
  export let manufacturer: string;
  export let quantity: number;
  export let subtotal: number;
  
  // Define events
  export let onQuantityChange: (id: string, newQuantity: number) => void;
  export let onRemove: (id: string) => void;
</script>

<div class="flex justify-between border-b border-gray-200 pb-4">
  <div>
    <h3 class="text-sm font-medium text-gray-900">{name}</h3>
    <p class="text-xs text-gray-500">{dosage} • {manufacturer}</p>
    <div class="mt-1 flex items-center">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button 
        class="text-gray-500 hover:text-gray-700"
        on:click={() => onQuantityChange(id, quantity - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <span class="mx-2 text-sm">{quantity}</span>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button 
        class="text-gray-500 hover:text-gray-700"
        on:click={() => onQuantityChange(id, quantity + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>
  <div class="text-right">
    <p class="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
    <button 
      class="mt-1 text-xs text-red-500 hover:text-red-700"
      on:click={() => onRemove(id)}
    >
      Remove
    </button>
  </div>
</div>