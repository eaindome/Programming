<script lang="ts">
    // @ts-ignore
    import { goto } from '$app/navigation';
    import AuthLayout from '../components/layouts/AuthLayout.svelte';
    import Button from '../components/ui/Button.svelte';
    import InputField from '../components/layouts/InputField.svelte';
    import Alert from '../components/ui/Alert.svelte';
    
    let email: string = '';
    let loading: boolean = false;
    let error: string = '';
    let success: boolean = false;
    
    async function handleSubmit() {
      error = '';
      loading = true;
      
      try {
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If successful
        success = true;
        // After showing success message, redirect to OTP verification
        setTimeout(() => {
          goto('/forgot-password/verify');
        }, 3000);
      } catch (err) {
        error = 'Unable to process your request. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <AuthLayout title="Forgot your password?" subtitle="Enter your email and we'll send you a verification code">
    {#if error}
      <Alert type="error" message={error} />
    {/if}
    
    {#if success}
      <Alert type="success" message="Verification code sent! Redirecting you to the verification page..." />
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <InputField 
        id="email" 
        label="Email address" 
        type="email" 
        value={email}
        required={true} 
        autocomplete="email"
      />
      
      <Button type="submit" variant="primary" fullWidth={true} loading={loading} disabled={success}>
        Send verification code
      </Button>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Remember your password?
          <a href="/login" class="font-medium text-[#1A5F7A] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </form>
  </AuthLayout>
  