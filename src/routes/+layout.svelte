<script lang="ts">
	import "../app.css";
	import { page } from '$app/stores'
	/** @type {import('./$types').LayoutData} */
	export let data;

	import BlueButton from "$lib/components/BlueButton.svelte";
	import { Navbar, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, DropdownDivider } from 'flowbite-svelte';

	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
	
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
				<Navbar class="border-gray-200 dark:bg-gray-900 dark:border-gray-700 bg-transparent h-10 flex items-center">
				  <NavHamburger />
			  
				  <NavUl {activeUrl}>
					{#each [
					  { label: 'Upload', items: [
						{ text: 'Screenshot', href: '/protected/upload' },
						{ text: 'Manual', href: '/protected/manual' },
						{ text: 'Expenses', href: '/protected/expenses' }
					  ]},
					  { label: 'Stories', items: [
						{ text: 'Share Strategy', href: '/protected/stories/share_strategy' },
						{ text: 'Share Issue', href: '/protected/stories/share_issue' },
						{ text: 'Community Stories', href: '/protected/stories' }
					  ]},
					  { label: 'Trends', items: [
						{ text: 'My Trends', href: '/protected/trends/personal' },
						{ text: 'Collective Insights', href: '/protected/trends/collective' }
					  ]},
					  { label: 'Settings', items: [
						{ text: 'Account', href: '/protected/settings/account' },
						{ text: 'Profile', href: '/protected/settings/profile' },
						{ text: 'Demographics', href: '/protected/settings/demographics' },
						{ text: 'Sharing Preferences', href: '/protected/settings/sharing_preferences' }
					  ]},
					  { label: 'Planner', items: [
						{ text: 'Taxes', href: '/protected/planner/taxes' },
						{ text: 'Work', href: '/protected/planner/work' }
					  ]}
					] as { label, items }}
					  <NavLi class="cursor-pointer text-lg">
						{label}
						<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
					  </NavLi>
					  <Dropdown class="w-44 z-20">
						{#each items as { text, href }}
						  <DropdownItem href={href}>{text}</DropdownItem>
						{/each}
					  </Dropdown>
					{/each}
				  </NavUl>
				</Navbar>
			  </div>
			  
			
			<form action="/logout" method="POST">
				<BlueButton buttonText="Log out" type="submit"/>
			</form>
			{/if}
		</header>
{/key}

<slot/>