<script lang="ts">
  import { onMount, createEventDispatcher, tick } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let otp: string[] = ['', '', '', ''];
  export let error: string = '';
  export let title: string = 'Enter verification code';
  export let subtitle: string = '';
  export let resendAction: (() => void) | null = null;
  export let countdown: number = 0; // Seconds for resend countdown
  export let autoFocus: boolean = true;
  
  let inputRefs: HTMLInputElement[] = [];
  let containerRef: HTMLDivElement;
  let isComplete = false;
  let remainingTime = countdown;
  let timer: ReturnType<typeof setInterval> | null = null;
  
  // Auto-detect when code is complete
  $: {
      isComplete = otp.every(digit => digit !== '');
      if (isComplete) {
          dispatch('complete', { code: otp.join('') });
      }
  }
  
  onMount(() => {
      if (autoFocus && inputRefs[0]) {
          setTimeout(() => inputRefs[0].focus(), 100);
      }
      
      if (countdown > 0) {
          startCountdown();
      }
      
      return () => {
          if (timer) clearInterval(timer);
      };
  });
  
  function startCountdown() {
      remainingTime = countdown;
      if (timer) clearInterval(timer);
      
      timer = setInterval(() => {
          remainingTime -= 1;
          if (remainingTime <= 0) {
              if (timer) clearInterval(timer);
          }
      }, 1000);
  }
  
  function formatTime(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  function handleInput(index: number) {
      const value = otp[index];
      
      // Ensure it's a single digit
      if (value.length > 1) {
          otp[index] = value.slice(0, 1);
      }
      
      // Ensure it's numeric
      if (!/^\d*$/.test(otp[index])) {
          otp[index] = '';
          return;
      }
      
      if (otp[index].length > 0) {
          // Move to next input if available
          if (index < otp.length - 1) {
              tick().then(() => inputRefs[index + 1].focus());
          }
      }
      
      otp = [...otp]; // Trigger reactivity
  }
  
  function handleKeyDown(event: KeyboardEvent, index: number) {
      if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
          // Move to previous input on backspace if current is empty
          inputRefs[index - 1].focus();
      } else if (event.key === 'ArrowLeft' && index > 0) {
          // Move to previous input on left arrow
          event.preventDefault();
          inputRefs[index - 1].focus();
      } else if (event.key === 'ArrowRight' && index < otp.length - 1) {
          // Move to next input on right arrow
          event.preventDefault();
          inputRefs[index + 1].focus();
      }
  }
  
  function handlePaste(event: ClipboardEvent) {
      event.preventDefault();
      
      const pastedData = event.clipboardData?.getData('text') || '';
      const digits = pastedData.replace(/\D/g, '').split('').slice(0, otp.length);
      
      otp = [...digits, ...Array(otp.length - digits.length).fill('')];
      
      // Focus the next empty input or the last one
      const nextEmptyIndex = otp.findIndex(v => v === '');
      if (nextEmptyIndex !== -1) {
          inputRefs[nextEmptyIndex].focus();
      } else if (inputRefs.length > 0) {
          inputRefs[otp.length - 1].focus();
      }
  }
  
  function handleFocus(index: number) {
      // Select text when focusing
      setTimeout(() => inputRefs[index].select(), 0);
  }
  
  function handleResend() {
      if (resendAction && remainingTime <= 0) {
          resendAction();
          startCountdown();
      }
  }
  
  function handleContainerClick() {
      // Focus first empty input or first input when clicking container
      const emptyIndex = otp.findIndex(v => v === '');
      const indexToFocus = emptyIndex === -1 ? 0 : emptyIndex;
      inputRefs[indexToFocus].focus();
  }
  
  function reset() {
      otp = Array(otp.length).fill('');
      if (inputRefs[0]) inputRefs[0].focus();
  }
</script>

<div class="mb-6">
  <div class="text-center mb-4">
      <h3 class="text-lg font-medium text-gray-900">{title}</h3>
      {#if subtitle}
          <p class="mt-1 text-sm text-gray-500">{subtitle}</p>
      {/if}
  </div>
  
  <!-- Outer container with click handler -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
      bind:this={containerRef}
      on:click={handleContainerClick}
      class="p-4 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300"
      class:bg-green-50={isComplete && !error}
      class:border-green-200={isComplete && !error}
      class:bg-red-50={!!error}
      class:border-red-200={!!error}
  >
      <!-- OTP input fields -->
      <div class="flex justify-center gap-3" id="otp-input">
          {#each otp as digit, i}
              <div class="relative">
                  <input
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      bind:value={otp[i]}
                      on:input={() => handleInput(i)}
                      on:keydown={(e) => handleKeyDown(e, i)}
                      on:paste={handlePaste}
                      on:focus={() => handleFocus(i)}
                      bind:this={inputRefs[i]}
                      id={`otp-input-${i}`}
                      aria-label={`Digit ${i+1} of verification code`}
                      class="w-14 h-16 text-center text-2xl font-bold border-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none {
                          digit 
                              ? error 
                                  ? 'border-red-400 bg-red-50' 
                                  : 'border-green-400 bg-green-50' 
                              : error 
                                  ? 'border-red-300 bg-white' 
                                  : 'border-gray-300 bg-white'
                      } focus:ring-2 focus:ring-[#1A5F7A] focus:border-[#1A5F7A] focus:scale-105"
                  />
                  
                  <!-- Animated underline indicators -->
                  <div class="mt-1 flex justify-between px-1">
                      <div class="h-1 w-1 rounded-full {
                          digit 
                              ? error 
                                  ? 'bg-red-400' 
                                  : 'bg-green-400' 
                              : 'bg-gray-300'
                          }"></div>
                      <div class="h-1 w-1 rounded-full {
                          digit 
                              ? error 
                                  ? 'bg-red-400' 
                                  : 'bg-green-400' 
                              : 'bg-gray-300'
                          }"></div>
                      <div class="h-1 w-1 rounded-full {
                          digit 
                              ? error 
                                  ? 'bg-red-400' 
                                  : 'bg-green-400' 
                              : 'bg-gray-300'
                          }"></div>
                  </div>
              </div>
          {/each}
      </div>
      
      <!-- Status messages and controls -->
      <div class="mt-4 flex justify-between items-center">
          <!-- Error or success message -->
          {#if error}
              <div class="flex items-center text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs">{error}</span>
              </div>
          {:else if isComplete}
              <div class="flex items-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-xs">Verification code complete</span>
              </div>
          {:else}
              <div class="text-xs text-gray-500">Enter the 4-digit code</div>
          {/if}
          
          <!-- Reset button -->
          <button 
              type="button" 
              on:click={reset}
              class="text-xs text-[#1A5F7A] hover:text-[#164d63] focus:outline-none {isComplete || otp.some(d => d !== '') ? '' : 'opacity-50 cursor-default'}"
              disabled={!isComplete && !otp.some(d => d !== '')}
          >
              Clear
          </button>
      </div>
  </div>
  
  <!-- Resend code option -->
  {#if resendAction}
      <div class="mt-4 text-center">
          <button 
              type="button"
              on:click={handleResend}
              disabled={remainingTime > 0}
              class="text-sm font-medium transition-colors duration-300 {
                  remainingTime > 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-[#1A5F7A] hover:text-[#164d63]'
              }"
          >
              {#if remainingTime > 0}
                  Resend code in {formatTime(remainingTime)}
              {:else}
                  Didn't receive a code? Resend
              {/if}
          </button>
      </div>
  {/if}
</div>

<style>
  /* Pulse animation for active input */
  input:focus {
      animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
      0% {
          box-shadow: 0 0 0 0 rgba(26, 95, 122, 0.4);
      }
      70% {
          box-shadow: 0 0 0 6px rgba(26, 95, 122, 0);
      }
      100% {
          box-shadow: 0 0 0 0 rgba(26, 95, 122, 0);
      }
  }
  
  /* Scale transition for inputs */
  input {
      transform-origin: center;
      backface-visibility: hidden;
  }
</style>