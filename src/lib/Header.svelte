<script lang="ts">
	import { page } from '$app/stores';
	import { authUser } from '$lib/authstore';
    import WorkerHeader from './WorkerHeader.svelte';
    import PolicymakerHeader from './PolicymakerHeader.svelte';
</script>

<header class="space-y-4 flex justify-center">
	<!-- <a href="/" class="font-bold hover:underline">Home</a> -->

	<nav class="flex gap-4">
		{#if $page.data.user?.role == "worker"}
			<WorkerHeader/>
		{:else if $page.data.user?.role == "policymaker"}
			<PolicymakerHeader/>
		<!-- {#if $page.data.user}
			<h1>{$page.data.user.role}</h1> -->
		{:else}
			<a href="/register" class="hover:underline text-4xl" class:active={$page.url.pathname === '/register'}
				>Register</a
			>
			<a href="/login" class="hover:underline text-4xl" class:active={$page.url.pathname === '/login'}
				>Login</a
			>
			<a href="/phone" class="hover:underline text-4xl" class:active={$page.url.pathname === '/phone'}
				>Phone</a
			>
		{/if}
	</nav>

</header>

<style lang="postcss">
	nav a.active {
		@apply font-bold text-indigo-700;
	}
</style>