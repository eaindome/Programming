<script lang="ts">
    // @ts-ignore
    import { goto } from '$app/navigation';
    import AuthLayout from '../components/layouts/AuthLayout.svelte';
    import Button from '../components/ui/Button.svelte';
    import InputField from '../components/layouts/InputField.svelte';
    import Alert from '../components/ui/Alert.svelte';
    import PasswordStrengthMeter from '../components/ui/PasswordStrengthMeter.svelte';
    
    let fullName: string = '';
    let email: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let agreeTerms: boolean = false;
    let loading: boolean = false;
    let error: string = '';
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If successful
        goto('/signup/verify');
      } catch (err) {
        error = 'Unable to create account. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <AuthLayout title="Create your account" subtitle="Start tracking medications securely">
    {#if error}
      <Alert type="error" message={error} />
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-5">
      <InputField 
        id="full-name" 
        label="Full name" 
        type="text" 
        value={fullName}
        required={true} 
        autocomplete="name"
      />
      
      <InputField 
        id="email" 
        label="Email address" 
        type="email" 
        value={email}
        required={true} 
        autocomplete="email"
      />
      
      <div>
        <InputField 
          id="password" 
          label="Password" 
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
        label="Confirm password" 
        type="password" 
        bind:value={confirmPassword} 
        required={true} 
        error={confirmPassword && !passwordsMatch ? "Passwords don't match" : ""}
      />
      <PasswordStrengthMeter password={password} />
      
      <div class="flex items-center">
        <input 
          id="agree-terms" 
          name="agree-terms" 
          type="checkbox" 
          bind:checked={agreeTerms} 
          required 
          class="h-4 w-4 text-[#1A5F7A] focus:ring-[#1A5F7A] border-gray-300 rounded"
        />
        <label for="agree-terms" class="ml-2 block text-sm text-gray-700">
          I agree to the <a href="/terms" class="text-[#1A5F7A] hover:underline">Terms of Service</a> and <a href="/privacy" class="text-[#1A5F7A] hover:underline">Privacy Policy</a>
        </label>
      </div>
  
      <Button type="submit" variant="primary" fullWidth={true} loading={loading}>
        Create account
      </Button>
      
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Already have an account?
          <a href="/login" class="font-medium text-[#1A5F7A] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </form>
  </AuthLayout>