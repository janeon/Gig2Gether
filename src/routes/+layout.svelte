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
		<slot />
	</main>
{/key}