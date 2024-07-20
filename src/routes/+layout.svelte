<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores'
	import BlueButton from "$lib/components/BlueButton.svelte";
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	// this page mainly does title and auth management
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

</script>

<svelte:head>
    <title>{title}</title> 
</svelte:head>

{#key title} 
		<header class="flex justify-between items-center p-4 bg-gray-100">
			
			<div>
				<h1 class="text-lg font-bold">{title}</h1>
			</div>
			
			{#if ["register", "Register Worker", "Register Policymaker", "GigUnity"].includes(title)}
				<BlueButton href="/login" buttonText="Login"/>
				
			{:else if title==="Login"}
			<BlueButton href="stay" buttonText="Register">
				<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
			</BlueButton>
			<Dropdown>
			<DropdownItem href="/register_worker">Worker</DropdownItem>
			<DropdownItem href="/register_policymaker">Policymaker</DropdownItem>
			</Dropdown>
			
			<!-- when logged in -->
			{:else} 
				<form action="/logout" method="POST">
					<BlueButton buttonText="Log out" type="submit"/>
				</form>
			{/if}
		</header>
{/key}

<slot/>