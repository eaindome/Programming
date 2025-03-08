<script lang="ts">
  export let password: string = '';
  
  // Track each criteria independently
  $: hasLength = password.length >= 8;
  $: hasUppercase = /[A-Z]/.test(password);
  $: hasLowercase = /[a-z]/.test(password);
  $: hasNumbers = /[0-9]/.test(password);
  $: hasSpecial = /[^A-Za-z0-9]/.test(password);
  $: hasLongLength = password.length >= 12;
  
  // Calculate overall strength
  $: strength = calculateStrength(password);
  $: strengthText = getStrengthText(strength);
  $: strengthColor = getStrengthColor(strength);
  $: strengthWidth = password ? (strength + 1) * 25 : 0;
  
  // Calculate criteria met count for progress animation
  $: criteriaMet = [hasLength, hasUppercase, hasLowercase, hasNumbers, hasSpecial, hasLongLength].filter(Boolean).length;
  $: criteriaPercentage = Math.min(100, Math.floor((criteriaMet / 6) * 100));
  
  function calculateStrength(pwd: string): number {
    if (!pwd) return 0;
    
    let score = 0;
    
    // Length check
    if (hasLength) score += 1;
    if (hasLongLength) score += 1;
    
    // Complexity checks
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecial) score += 1;
    
    return Math.min(Math.floor(score / 2), 3);
  }
  
  function getStrengthText(value: number): string {
    if (!password) return 'Enter password';
    const texts = ['Weak', 'Medium', 'Strong', 'Very strong'];
    return texts[value];
  }
  
  function getStrengthColor(value: number): string {
    if (!password) return 'bg-gray-300';
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-[#56C271]', 'bg-green-600'];
    return colors[value];
  }
  
  function getCriteriaClass(isValid: boolean): string {
    return isValid ? 'text-green-600' : 'text-gray-400';
  }
  
  function getIconClass(isValid: boolean): string {
    return isValid ? 'text-green-600' : 'text-gray-300';
  }
</script>

<div class="mt-3 mb-4">
<!-- Animated strength meter bar -->
<div class="flex h-2 overflow-hidden bg-gray-200 rounded-full">
  <div class="{strengthColor} transition-all duration-500 ease-out" 
       style="width: {strengthWidth}%" 
       class:animate-pulse={strength < 2 && password}></div>
</div>

<!-- Strength label with emoji indicators -->
<div class="flex items-center justify-between mt-2">
  <p class="text-sm font-medium" class:text-red-500={strength === 0 && password} 
     class:text-yellow-500={strength === 1} 
     class:text-[#56C271]={strength === 2}
     class:text-green-600={strength === 3}>
    {#if password}
      {#if strength === 0}
        <span>😟 {strengthText}</span>
      {:else if strength === 1}
        <span>😐 {strengthText}</span>
      {:else if strength === 2}
        <span>😊 {strengthText}</span>
      {:else}
        <span>🔒 {strengthText}</span>
      {/if}
    {:else}
      <span class="text-gray-400">{strengthText}</span>
    {/if}
  </p>
  
  <!-- Criteria completion percentage -->
  <p class="text-xs text-gray-500">{criteriaPercentage}% complete</p>
</div>

<!-- Password criteria checklist -->
<div class="mt-3 grid grid-cols-2 gap-2 text-xs">
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasLength)}>
      {#if hasLength}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasLength)}>At least 8 characters</span>
  </div>
  
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasUppercase)}>
      {#if hasUppercase}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasUppercase)}>Uppercase letter</span>
  </div>
  
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasLowercase)}>
      {#if hasLowercase}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasLowercase)}>Lowercase letter</span>
  </div>
  
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasNumbers)}>
      {#if hasNumbers}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasNumbers)}>Number</span>
  </div>
  
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasSpecial)}>
      {#if hasSpecial}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasSpecial)}>Special character</span>
  </div>
  
  <div class="flex items-center gap-1 transition-colors duration-300">
    <span class={getIconClass(hasLongLength)}>
      {#if hasLongLength}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
        </svg>
      {/if}
    </span>
    <span class={getCriteriaClass(hasLongLength)}>12+ characters (best)</span>
  </div>
</div>
</div>
  