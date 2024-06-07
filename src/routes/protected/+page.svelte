<script>

    import { page } from "$app/stores";

</script>
<svelte:head>
	<title>Protected route</title>
</svelte:head>

<h1 class="text-4xl font-bold">Protected route</h1>
<a href = "/protected/demographics" class="hover:underline" class:active={$page.url.pathname === '/protected/demographics'}>
	Change My Demographics</a>