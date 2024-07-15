<script lang="ts">
	import "../app.css";
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'
	let title: string = ($page.url.pathname === "/") ? "GigUnity" : $page.url.pathname.split('/').filter(Boolean).pop() as string;
	$: (title = ($page.url.pathname === "/") ? "GigUnity" : $page.url.pathname.split('/').filter(Boolean).pop() as string);
	$: console.log(title);

</script>
{#key $page.url.pathname} 
	<main> 
		<header class="flex justify-between items-center p-4 bg-gray-100">
			
			<div>
				<h1 class="text-lg font-bold">{title}</h1>
			</div>
			
			{#if title==="register" || title==="GigUnity"}
				<button 
				class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
				on:click={() => goto('/login')}
				>
					<a href="/login" class="hover:underline">Login</a>
				</button>
			{:else if title==="login"}
				<button 
				class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
				on:click={() => goto('/register')}
				>
					<a href="/register" class="hover:underline">Register</a>
				</button>
			{:else} 
				<form action="/logout" method="POST">
					<button type="submit">Log out</button>
				</form>
			{/if}
			

		</header>
		<slot />
	</main>
{/key}