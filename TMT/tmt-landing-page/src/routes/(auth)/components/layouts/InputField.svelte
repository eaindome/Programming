<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let id: string;
  export let label: string;
  export let type: string = "text";
  export let value: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let error: string = "";
  export let autocomplete: string = "";
  export let helpText: string = "";
  export let maxLength: number | null = null;
  export let icon: string = "";
  export let iconPosition: "left" | "right" = "left";
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let showCharCount: boolean = false;
  export let successMessage: string = "";
  
  let focused: boolean = false;
  let inputElement: HTMLInputElement;
  let showPassword: boolean = false;
  
  $: actualType = type === "password" && showPassword ? "text" : type;
  $: hasValue = value && value.length > 0;
  $: charCount = value ? value.length : 0;
  $: validState = hasValue && !error && successMessage;
  
  function togglePassword() {
      showPassword = !showPassword;
  }
  
  function handleFocus() {
      focused = true;
      dispatch('focus');
  }
  
  function handleBlur() {
      focused = false;
      dispatch('blur');
  }
  
  function handleClear() {
      value = "";
      inputElement.focus();
      dispatch('clear');
  }
</script>

<div class="mb-4 relative">
  <!-- Label with floating animation -->
  <label 
      for={id} 
      class="transition-all duration-200 absolute text-sm font-medium z-10 {
          focused || hasValue 
              ? '-top-2 left-2 px-1 text-xs bg-white rounded' 
              : 'top-2 left-3'
      } {
          error 
              ? 'text-red-600' 
              : focused 
                  ? 'text-[#1A5F7A]' 
                  : validState 
                      ? 'text-green-600' 
                      : 'text-gray-500'
      }"
  >
      {label} {required ? '*' : ''}
  </label>
  
  <!-- Input wrapper with icon support -->
  <div class="relative">
      {#if icon && iconPosition === "left"}
          <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <!-- Icon would go here -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <!-- This is a placeholder, replace with your actual icon -->
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
          </div>
      {/if}
      
      <input
          {id}
          type={actualType}
          {placeholder}
          {required}
          {disabled}
          {readonly}
          maxlength={maxLength}
          autocomplete={autocomplete as unknown as AutoFill || null}
          bind:value
          bind:this={inputElement}
          on:focus={handleFocus}
          on:blur={handleBlur}
          class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 transition-all duration-200 ease-in-out {
              focused ? 'border-[#1A5F7A] ring-1 ring-[#1A5F7A]' : 
              error ? 'border-red-500 ring-1 ring-red-500' : 
              validState ? 'border-green-500 ring-1 ring-green-500' : 
              'border-[#E2E8F0] hover:border-gray-400'
          } {
              icon && iconPosition === 'left' ? 'pl-10' : ''
          } {
              (type === 'password' || (hasValue && !disabled && !readonly)) ? 'pr-10' : ''
          } sm:text-sm {
              disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
          }"
      />
      
      <!-- Password toggle or clear button -->
      {#if type === "password"}
          <button 
              type="button"
              on:click={togglePassword}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
          >
              {#if showPassword}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
              {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
              {/if}
          </button>
      {:else if hasValue && !disabled && !readonly}
          <button 
              type="button"
              on:click={handleClear}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear input"
          >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
          </button>
      {/if}
      
      {#if icon && iconPosition === "right"}
          <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <!-- Icon would go here -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
          </div>
      {/if}
  </div>
  
  <!-- Character counter and validation messages -->
  <div class="mt-1 flex justify-between items-start">
      <div>
          {#if error}
              <p class="text-xs text-red-600 flex items-center" transition:fly={{ y: -10, duration: 200 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {error}
              </p>
          {:else if successMessage && hasValue}
              <p class="text-xs text-green-600 flex items-center" transition:fly={{ y: -10, duration: 200 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {successMessage}
              </p>
          {:else if helpText}
              <p class="text-xs text-gray-500" transition:fade={{ duration: 200 }}>
                  {helpText}
              </p>
          {/if}
      </div>
      
      {#if showCharCount && maxLength}
          <p class="text-xs text-gray-500 ml-2 tabular-nums">
              {charCount}/{maxLength}
          </p>
      {/if}
  </div>
</div>

<style>
  /* Add subtle animation when focusing */
  input:focus {
      transform: translateY(-1px);
  }
  
  /* Animated underline effect */
  input:focus::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2px;
      background-color: #1A5F7A;
      animation: underline 0.3s ease-in-out forwards;
  }
  
  @keyframes underline {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
  }
</style>