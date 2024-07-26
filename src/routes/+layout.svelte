<!-- Home page layouts -->
<script lang="ts">
	import { onMount } from 'svelte';
	import "../app.css";
	import { page } from '$app/stores'
	/** @type {import('./$types').LayoutData} */
	export let data;

	import BlueButton from "$lib/components/BlueButton.svelte";
	import { Navbar, NavLi, NavUl, Dropdown, DropdownItem, BottomNav, BottomNavItem} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	
	$: activeUrl = $page.url.pathname;
	let mobile: boolean;
	let protected_urls: boolean;
	
	onMount(() => {
		mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
		protected_urls = activeUrl.startsWith('/protected');
	});
			  
	// Utility function to check if the URL is active
	function isActive(href) {
		const segments = href.split('/').filter(Boolean);
    	const base = '/' + segments.slice(0, 2).join('/');
		return activeUrl.startsWith(base);
	}

	function parsePageNameFromUrl(url: string) {
		let lastSegment = url.split('/').filter(Boolean).pop() as string
		lastSegment = lastSegment.split('_')          // Split the string by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
            .join(' ');          // Join the words with spaces
		return (lastSegment === 'Protected') ? 'Home' : lastSegment;
	}

	let title: string;
	$: (title = ($page.url.pathname === "/") ? "GigConnect" 
		: parsePageNameFromUrl(activeUrl));

	const navItems = [
		{ label: "Upload", icon: "fas fa-upload", href: '/protected/upload' },
		{ label: "Stories", icon: "fas fa-book", href: '/protected/stories' },
		{ label: "Trends", icon: "fas fa-chart-line", href: '/protected/trends/personal' },
		{ label: "Settings", icon: "fas fa-cog", href: '/protected/settings/account' },
		{ label: "Planner", icon: "fas fa-calendar", href: '/protected/planner/taxes' }
  	];

</script>

<svelte:head>
    <title>{title}</title> 
</svelte:head>

{#key title} 
	<!-- top nav bar for web -->
	<div class={(mobile && protected_urls) ? 'hidden md:block' : 'block'}>
		<header class="flex justify-between items-center p-4 bg-gray-100">
			{#if ["register", "Register Worker", "Register Policymaker"].includes(title)}
			<div>
				<h1 class="text-lg font-bold">{title}</h1>
			</div>
				<BlueButton href="/login" buttonText="Login"/>
			{:else if title==="GigConnect"}
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
				<a href="/protected" class="text-lg font-bold">{"GigConnect"}</a>
			</div>

			<div class="flex justify-center w-7/8">
				<Navbar 
				class="border-gray-200 dark:bg-gray-900 dark:border-gray-700 bg-transparent h-10 flex items-center w-full max-w-screen-lg mx-auto">
				  <NavUl>
					{#each navItems as { label, href }}
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

	<!-- Bottom navigation -->
	<div class={mobile && protected_urls ? 'fixed bottom-0 w-full md:hidden' : 'hidden'}>
		<BottomNav position="absolute" classInner="grid-cols-5">
			{#each navItems as item}
			  <BottomNavItem href={item.href}>
				  <i class={item.icon + " w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500 " + (isActive(item.href) ? 'text-primary-600 dark:text-primary-500 font-bold text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 dark:text-blue-300' : '')}></i>
				  <span class={"text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl " + (isActive(item.href) ? 'font-bold text-blue-500 hover:text-blue-900 dark:hover:text-blue-700 dark:text-blue-300' : '')}>{item.label}</span>
			  </BottomNavItem>
			{/each}
		  </BottomNav>
	</div>
{/key}

<slot/>
