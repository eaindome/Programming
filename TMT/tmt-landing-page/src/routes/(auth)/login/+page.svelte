<script lang="ts">
  // @ts-ignore
	import { goto } from '$app/navigation';
	import AuthLayout from '../components/layouts/AuthLayout.svelte';
	import Button from '../components/ui/Button.svelte';
	import InputField from '../components/layouts/InputField.svelte';
	import Alert from '../components/ui/Alert.svelte';

	let email: string = '';
	let password: string = '';
	let rememberMe: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	async function handleSubmit() {
		error = '';
		loading = true;

		try {
			// Simulate API call - replace with actual authentication API
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// If successful
			goto('/dashboard');
		} catch (err) {
			error = 'Invalid email or password. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<AuthLayout title="Sign in to your account" subtitle="Track your medication securely">
	{#if error}
		<Alert type="error" message={error} />
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

		<div>
			<InputField
				id="password"
				label="Password"
				type="password"
				value={password}
				required={true}
				autocomplete="current-password"
			/>

			<div class="mt-2 flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						bind:checked={rememberMe}
						class="h-4 w-4 rounded border-gray-300 text-[#1A5F7A] focus:ring-[#1A5F7A]"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-700"> Remember me </label>
				</div>

				<div class="text-sm">
					<a href="/forgot-password" class="font-medium text-[#1A5F7A] hover:underline">
						Forgot your password?
					</a>
				</div>
			</div>
		</div>

		<Button type="submit" variant="primary" fullWidth={true} {loading}>Sign in</Button>

		<div class="text-center">
			<p class="text-sm text-gray-600">
				Don't have an account?
				<a href="/signup" class="font-medium text-[#1A5F7A] hover:underline"> Sign up now </a>
			</p>
		</div>
	</form>
</AuthLayout>
