<script>

    import { page } from "$app/stores";
    import { authUser } from "$lib/authstore";

</script>
<svelte:head>
	<title>Protected route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Protected route</h1>

{#if $authUser && $authUser.role == "worker"}
<a href = "/protected/demographics" class="hover:underline" class:active={$page.url.pathname === '/protected/demographics'}>
	Change My Demographics</a>
{/if}