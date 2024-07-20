<script lang="ts">
	import "../app.css";
	import { goto } from '$app/navigation';
	import { page } from '$app/stores'
	import { Card } from 'flowbite-svelte';
	
	// this page mainly does title management
	function parsePageNameFromUrl(url: string) {
		let lastSegment = url.split('/').filter(Boolean).pop() as string
		lastSegment = lastSegment.split('_')          // Split the string by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
            .join(' ');          // Join the words with spaces
		return (lastSegment === 'Protected') ? 'Home' : lastSegment;
	}

	let title: string;
	$: (title = ($page.url.pathname === "/") ? "GigUnity" 
		: parsePageNameFromUrl($page.url.pathname));
	// $: console.log(title);

</script>

<svelte:head>
    <title>{title}</title> 
</svelte:head>

{#key $page.url.pathname} 
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
			{:else if title==="register_worker" || title==="register_policymaker"}
				<button 
				class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
				on:click={() => goto('/login')}
				>
					<a href="/login" class="hover:underline">Login</a>
				</button>
            {:else if title==="login" || title==="phone"}
            <div class="flex justify-end space-x-4">
                <button 
                    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    on:click={() => goto('/register_worker')}
                >
                    <a href="/register_worker" class="hover:underline">Worker Register</a>
                </button>
                <button 
                    class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    on:click={() => goto('/register_policymaker')}
                >
                    <a href="/register_policymaker" class="hover:underline">Policymaker Register</a>
                </button>
            </div>
			
			{:else} 
				<form action="/logout" method="POST">
					<button type="submit">Log out</button>
				</form>
			{/if}
		</header>
{/key}

<slot/>