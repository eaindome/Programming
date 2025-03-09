<script lang="ts">
    // @ts-ignore
    import { goto } from '$app/navigation';
    import AuthLayout from '../../components/layouts/AuthLayout.svelte';
    import Button from '../../components/ui/Button.svelte';
    import Alert from '../../components/ui/Alert.svelte';
    import OtpInput from '../../components/layouts/OtpInput.svelte';
    
    let otp: string[] = ['', '', '', ''];
    let loading: boolean = false;
    let error: string = '';
    let countdown: number = 60;
    let canResend: boolean = false;
    
    function startCountdown() {
      canResend = false;
      countdown = 60;
      
      const timer = setInterval(() => {
        countdown -= 1;
        if (countdown <= 0) {
          clearInterval(timer);
          canResend = true;
        }
      }, 1000);
    }
    
    // Start countdown on component mount
    startCountdown();
    
    async function handleResend() {
      if (!canResend) return;
      
      try {
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Reset OTP input
        otp = ['', '', '', ''];
        
        // Restart countdown
        startCountdown();
      } catch (err) {
        error = 'Unable to resend code. Please try again.';
      }
    }
    
    async function handleSubmit() {
      error = '';
      loading = true;
      
      const otpCode = otp.join('');
      
      if (otpCode.length !== 4) {
        error = 'Please enter the complete 4-digit code';
        loading = false;
        return;
      }
      
      try {
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If successful
        goto('/login');
      } catch (err) {
        error = 'Invalid verification code. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <AuthLayout title="Verify your email" subtitle="Enter the 4-digit code sent to your email">
    {#if error}
      <Alert type="error" message={error} />
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <OtpInput bind:otp {error} />
      
      <Button type="submit" variant="primary" fullWidth={true} loading={loading}>
        Verify
      </Button>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Didn't receive a code?
          <button 
            type="button" 
            on:click={handleResend} 
            class="font-medium {canResend ? 'text-[#1A5F7A] hover:underline' : 'text-gray-400 cursor-not-allowed'}"
            disabled={!canResend}
          >
            {canResend ? 'Resend code' : `Resend in ${countdown}s`}
          </button>
        </p>
      </div>
    </form>
  </AuthLayout>
  