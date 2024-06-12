<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';
	import { authUser } from '$lib/authstore';
    import WorkerHeader from './WorkerHeader.svelte';
    import PolicymakerHeader from './PolicymakerHeader.svelte';
</script>

<header class="space-y-4">
	<a href="/" class="font-bold hover:underline">Home</a>

	<nav class="flex gap-4">
		{#if $authUser && $authUser.role == "worker"}
			<WorkerHeader/>
		{:else if $authUser && $authUser.role == "policymaker"}
			<PolicymakerHeader/>
		{:else}
			<a href="/register" class="hover:underline" class:active={$page.url.pathname === '/register'}
				>Register</a
			>
			<a href="/login" class="hover:underline" class:active={$page.url.pathname === '/login'}
				>Login</a
			>
		{/if}
	</nav>
</header>

<style lang="postcss">
	nav a.active {
		@apply font-bold text-indigo-700;
	}
</style>