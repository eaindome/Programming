<script lang="ts">
    // @ts-ignore
    import { goto } from '$app/navigation';
    import AuthLayout from '../../components/layouts/AuthLayout.svelte';
    import Button from '../../components/ui/Button.svelte';
    import InputField from '../../components/layouts/InputField.svelte';
    import Alert from '../../components/ui/Alert.svelte';
    import PasswordStrengthMeter from '../../components/ui/PasswordStrengthMeter.svelte';
    
    let password: string = '';
    let confirmPassword: string = '';
    let loading: boolean = false;
    let error: string = '';
    let success: boolean = false;
    let passwordErrors: {[key: string]: string} = {};
    
    $: passwordsMatch = password === confirmPassword;
    
    function validatePassword() {
      const errors: {[key: string]: string} = {};
      
      if (password.length < 8) {
        errors.length = 'Password must be at least 8 characters';
      }
      
      if (!/[A-Z]/.test(password)) {
        errors.uppercase = 'Password must contain at least one uppercase letter';
      }
      
      if (!/[a-z]/.test(password)) {
        errors.lowercase = 'Password must contain at least one lowercase letter';
      }
      
      if (!/[0-9]/.test(password)) {
        errors.number = 'Password must contain at least one number';
      }
      
      if (!/[^A-Za-z0-9]/.test(password)) {
        errors.special = 'Password must contain at least one special character';
      }
      
      passwordErrors = errors;
      return Object.keys(errors).length === 0;
    }
    
    async function handleSubmit() {
      error = '';
      loading = true;
      
      // Validate passwords
      if (!validatePassword()) {
        error = 'Please fix the password issues';
        loading = false;
        return;
      }
      
      if (!passwordsMatch) {
        error = 'Passwords do not match';
        loading = false;
        return;
      }
      
      try {
        // Simulate API call - replace with actual API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If successful
        success = true;
        
        // Redirect to login after showing success message
        setTimeout(() => {
          goto('/login');
        }, 3000);
      } catch (err) {
        error = 'Unable to reset your password. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <AuthLayout title="Reset your password" subtitle="Create a new password for your account">
    {#if error}
      <Alert type="error" message={error} />
    {/if}
    
    {#if success}
      <Alert type="success" message="Password reset successfully! Redirecting to login..." />
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div>
        <InputField 
          id="password" 
          label="New password" 
          type="password" 
          bind:value={password} 
          required={true}
          autocomplete="new-password"
        />
        
        {#if password && Object.keys(passwordErrors).length > 0}
          <ul class="mt-1 text-xs text-red-600 pl-4 space-y-1">
            {#each Object.values(passwordErrors) as error}
              <li>{error}</li>
            {/each}
          </ul>
        {/if}
      </div>
      
      <InputField 
        id="confirm-password" 
        label="Confirm new password" 
        type="password" 
        bind:value={confirmPassword} 
        required={true} 
        error={confirmPassword && !passwordsMatch ? "Passwords don't match" : ""}
      />
      <PasswordStrengthMeter password={password} />
      
      <Button type="submit" variant="primary" fullWidth={true} loading={loading} disabled={success}>
        Reset password
      </Button>
    </form>
  </AuthLayout>
  