<script>
	import { goto } from '$app/navigation';
    export let data;
</script>

<svelte:head>
	<title>Protected route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Protected route</h1>

{#if data.user}
    <p>Welcome, {data.user.email}</p>
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    on:click={() => goto("/protected/demographics")}>
        Edit My Demographics
    </button>
{/if}