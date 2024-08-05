<!-- Home page layouts -->
<script lang="ts">
	import { onMount } from 'svelte';
	import "../app.css";
	import { page } from '$app/stores'
	/** @type {import('./$types').LayoutData} */
	export let form : ActionData;
	export let data;
	$: activeUrl = $page.url.pathname;
  	let activeClass = 'text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-500';

	import BlueButton from "$lib/components/BlueButton.svelte";
	import { Avatar, DropdownHeader, DropdownDivider, Navbar, NavLi, NavUl, Dropdown, DropdownItem, BottomNav, BottomNavItem} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import type { ActionData } from './protected/$types';
	import Button from '$lib/components/ui/button/button.svelte';
	
	let mobile: boolean;
	let protected_urls: boolean;
	let loggedIn = $page.data.user===undefined ? false : true;
	console.log("logged in", loggedIn);
	
	
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
		lastSegment = lastSegment.split('-')          // Split the string by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
            .join(' ');          // Join the words with spaces
		return (lastSegment === 'Protected') ? 'Home' : lastSegment;
	}

	let title: string;
	$: (title = ($page.url.pathname === "/") ? "Gig2Gether" 
		: parsePageNameFromUrl(activeUrl));

	const navItems = [
		{ label: "Upload", icon: "fas fa-upload", href: '/protected/upload/CSV' },
		{ label: "Stories", icon: "fas fa-book", href: '/protected/stories/story-feed' },
		{ label: "Trends", icon: "fas fa-chart-line", href: '/protected/trends/personal' },
		{ label: "Settings", icon: "fas fa-cog", href: '/protected/settings/account' },
		{ label: "Planner", icon: "fas fa-calendar", href: '/protected/planner/work-day' }
  	];

</script>

<svelte:head>
    <title>{title}</title> 
</svelte:head>
{#key [title, loggedIn].join(';')} 
	<!-- top nav bar for web -->
	<div class={(mobile && protected_urls) ? 'hidden md:block' : 'block'}>
		<header class="flex justify-between items-center p-4 bg-gray-100">
			{#if ["register", "Register Worker", "Register Policymaker"].includes(title)}
			<div>
				<Button href="/" class="bg-gray-200 text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold py-1 px-2">Gig2Gether</Button>
			</div>
			<div class="whitespace-nowrap max-w-full overflow-hidden pl-2 pr-10">
				<h1 class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{title}</h1>
			</div>
			<div>
				<BlueButton href="/login" buttonText="Login"/>
			</div>
			{:else if title==="Gig2Gether"}
				<div>
					{#if data.user===undefined}
					<Button href="/" class="bg-gray-200 text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold py-1 px-2">{title}</Button>
					{:else}
					<Button href="/protected" class="bg-gray-200 text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold py-1 px-2">{title}</Button>
					{/if}
				</div>
				{#if loggedIn}
				<form action="/logout" method="POST" use:enhance bind:this={form}>
				<BlueButton href="/" buttonText="Log Out" onclick={() => form.submit()}/>
				</form>
				{:else}
				<BlueButton href="/login" buttonText="Login"/>
				{/if}

			{:else if title==="Login"}
			<div>
				<Button href="/" class="bg-gray-200 text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold py-2 px-2">Gig2Gether</Button>
			</div>
			  
			<div class="whitespace-nowrap max-w-full overflow-hidden pl-2 pr-10">
				<h1 class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{title}</h1>
			</div>
			<BlueButton href="stay" buttonText="Register">
				<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
			</BlueButton>
			<Dropdown>
			<DropdownItem href="/register-worker">Worker</DropdownItem>
			<DropdownItem href="/register-policymaker">Policymaker</DropdownItem>
			</Dropdown>
			
			
			{:else} <!-- usually user is authenticated -->
			<!-- Using native flowbite instead of flowbite-svelte bc height & break pt issues -->
			<!-- https://github.com/themesberg/flowbite-svelte/issues/1156 -->
			<div>
				<a href="/protected" class="bg-gray-200 text-black text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold py-1 px-2">{"Gig2Gether"}</a>
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
			<div class="mr-3">
			<Avatar class="acs mr-3 w-8 h-8" dot={{ color: 'green' }} border/>
			<Dropdown {activeUrl} {activeClass} triggeredBy=".acs">
				<DropdownHeader>
				  <span class="block text-sm text-gray-900 dark:text-white">Username</span>
				  <span class="block truncate text-sm font-medium">{$page.data.user?.username}</span>
				</DropdownHeader>
				<DropdownItem href="/protected">Home</DropdownItem>
				<DropdownItem href="/protected/settings/account">Account</DropdownItem>
				<DropdownItem>Notifications</DropdownItem>
				<DropdownDivider />

				<form action="/logout" method="POST" use:enhance bind:this={form}>
				<DropdownItem slot="footer" on:click={() => form.submit()}>
					Log out
				</DropdownItem>
				</form>
			</Dropdown>
			</div>
			{/if}
		</header>
	</div>

	<!-- Bottom navigation -->
	<div class={mobile && protected_urls ? 'fixed bottom-0 w-full md:hidden z-30' : 'hidden'}>
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