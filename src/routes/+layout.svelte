<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores'
	/** @type {import('./$types').LayoutData} */
	export let data;

	import BlueButton from "$lib/components/BlueButton.svelte";
	import { Navbar, NavLi, NavUl, Dropdown, DropdownItem, BottomNav, BottomNavItem} from 'flowbite-svelte';

	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
			  
	// Utility function to check if the URL is active
	function isActive(href) {
		return activeUrl === href;
	}
	
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
		: parsePageNameFromUrl(activeUrl));

</script>

<svelte:head>
    <title>{title}</title> 
</svelte:head>

{#key title} 
	<div class="hidden md:block">
		<header class="flex justify-between items-center p-4 bg-gray-100">
			{#if ["register", "Register Worker", "Register Policymaker"].includes(title)}
			<div>
				<h1 class="text-lg font-bold">{title}</h1>
			</div>
				<BlueButton href="/login" buttonText="Login"/>
			{:else if title==="GigUnity"}
				<div>
					{#if data.user===undefined}
						<a href="/" class="text-lg font-bold">{title}</a>
					{:else}
						<a href="/protected" class="text-lg font-bold">{title}</a>
					{/if}
				</div>
				<BlueButton href="/login" buttonText="Login"/>

			{:else if title==="Login"}
			<div>
				<h1 class="text-lg font-bold">{title}</h1>
			</div>
			<BlueButton href="stay" buttonText="Register">
				<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
			</BlueButton>
			<Dropdown>
			<DropdownItem href="/register_worker">Worker</DropdownItem>
			<DropdownItem href="/register_policymaker">Policymaker</DropdownItem>
			</Dropdown>
			
			
			{:else} 
			<!-- Using native flowbite instead of flowbite-svelte bc height & break pt issues -->
			<!-- https://github.com/themesberg/flowbite-svelte/issues/1156 -->
			<div>
				<a href="/protected" class="text-lg font-bold">{"GigUnity"}</a>
			</div>

			<div class="flex justify-center w-7/8">
				<Navbar 
				class="border-gray-200 dark:bg-gray-900 dark:border-gray-700 bg-transparent h-10 flex items-center w-full max-w-screen-lg mx-auto">
				  <NavUl>
					{#each [
					  { label: 'Upload', href: '/protected/upload' },
					  { label: 'Stories', href: '/protected/stories/share_strategy' },
					  { label: 'Trends', href: '/protected/trends/personal' },
					  { label: 'Settings', href: '/protected/settings/account' },
					  { label: 'Planner', href: '/protected/planner/taxes' }
					] as { label, href }}
					<NavLi class={`cursor-pointer text-lg ${isActive(href) ? 'text-blue-700 dark:text-blue-500 dark:bg-gray-800' : 'text-gray-900 dark:text-gray-400'}`} href={href}>
						<a href={href} class={href === activeUrl ? 'text-blue-700' : ''}>{label}</a>
					</NavLi>
					{/each}
				  </NavUl>
				</Navbar>
			  </div>
			
			<form action="/logout" method="POST">
				<BlueButton buttonText="Log out" type="submit"/>
			</form>
			{/if}
		</header>
	</div>
	<div class="block md:hidden">
		<BottomNav position="absolute" classInner="grid-cols-4">
			<BottomNavItem btnName="Home">
				<i class="fas fa-upload w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
				<!-- <HomeSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" /> -->
			</BottomNavItem>
			<BottomNavItem btnName="Wallet">
			<!-- <WalletSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" /> -->
			</BottomNavItem>
			<BottomNavItem btnName="Settings">
			<!-- <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" /> -->
			</BottomNavItem>
			<BottomNavItem btnName="Profile">
			<!-- <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" /> -->
			</BottomNavItem>
		</BottomNav>
	</div>
{/key}

<slot/>