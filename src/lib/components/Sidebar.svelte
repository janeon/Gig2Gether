<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Drawer,
		CloseButton,
		Button,
		Avatar,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		Badge
	} from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { capitalize } from '$lib/utils';
	import { profileStatus } from '$lib/stores/profileCompletion';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/protected/$types';
	import { goto } from '$app/navigation';

	let form: ActionData;
	$: activeUrl = equivalent_urls.includes($page.url.pathname)
		? '/protected/planner/work-day'
		: $page.url.pathname;
	const equivalent_urls = ['/protected/planner/work-breakdown', '/protected/planner/work-results'];
	let activeClass =
		'text-customBeige-700 dark:text-customBeige-500 hover:text-customBeige-600 dark:hover:text-customBeige-300';
	let mobile: boolean;

	let profileCompletion;
	let unsubscribe;
	$: unsubscribe = profileStatus.subscribe(value => {
        profileCompletion = value.isCompleted ;
    });

	onMount(() => {
		mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			window.navigator.userAgent
		);
	});

	onDestroy(() => {
		unsubscribe();
	});

	let hidden2 = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	const closeDrawer = () => {
		window.scrollTo(0, 0); // Scroll to top when closing the drawer
		hidden2 = true;
	};

	const settings = [
		{ label: 'My Worker Profile', href: '/protected/settings/profile' },
		{ label: 'My Account', href: '/protected/settings/account' },
		{ label: 'Demographics', href: '/protected/settings/demographics' },
		{ label: 'Sharing Preferences', href: '/protected/settings/sharing-preferences' },
		{ label: 'Manage Data', href: '/protected/settings/withdraw' },
		{ label: 'Reminders', href: '/protected/settings/notifications' }
	];

	const stories = [
		{ label: 'Story Feed', href: '/protected/stories/story-feed' },
		{ label: 'Share Story', href: '/protected/stories/share-story' }
	];

	const trends = [
		{ label: 'My Trends', href: '/protected/trends/personal' },
		{ label: 'Collective Insights', href: '/protected/trends/aggregate' }
	];

	const planner = [
		{ label: 'Work', href: '/protected/planner/work-day' },
		{ label: 'Tax', href: '/protected/planner/tax' }
	];

	let upload_options = [];

	if ($page.data.user?.platform === 'uber') {
		upload_options = [
			{ label: 'CSV', href: '/protected/upload/CSV' },
			{ label: 'Quests', href: '/protected/upload/quests' },
			{ label: 'Trips', href: '/protected/upload/trips' }
		];
	} else if ($page.data.user?.platform === 'rover') {
		upload_options = [{ label: 'Income', href: '/protected/upload/manual' }];
	} else if ($page.data.user?.platform === 'upwork') {
		upload_options = [{ label: 'Income', href: '/protected/upload/manual' }];
	}

	// Add common items
	upload_options.push({ label: 'Expenses', href: '/protected/upload/expenses' });

	const options = {
		settings: settings,
		sharing: stories,
		upload: upload_options,
		trends: trends,
		planner: planner
	};

	export let option: string;
	export let title: string;

	function handleNavigation(href: string) {
		window.scrollTo(0, 0); // Scroll to top
		setTimeout(() => {
			window.location.href = href; // Navigate to the href
		}, 100); // Small delay to ensure scrolling completes
	}

    function handleLogout() {
        (form as HTMLFormElement).submit();
    }

</script>

<!-- Hamburger button for smaller screensize -->
<div class="relative flex items-center py-3 bg-gray-700 text-white block md:hidden">
	{#if mobile}
		<Button
			on:click={() => (hidden2 = false)}
			class="absolute left-0 text-center font-medium focus-within:ring-4 
      flex items-center pl-5 pr-3 py-3 
      text-sm rounded-lg bg-transparent text-black block md:hidden h-12"
		>
			<i class="fas fa-bars text-2xl mb-2 text-white"></i>
		</Button>
		<h1
			class="absolute left-1/2 transform -translate-x-1/2 font-bold text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl"
			style="font-size: 0.85rem;"
		>
			{title}
		</h1>
		<div class="ml-auto mr-3 flex items-center">
			<Avatar class="acs mr-3 w-8 h-8" dot={{ color: 'green' }} border />
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
					<DropdownItem slot="footer" on:click={handleLogout}>
						Log out</DropdownItem>
				</form>
			</Dropdown>
		</div>
	{/if}
</div>

<!-- Sidebar for medium and large screens -->
<Sidebar {activeUrl} class="w-1/4 max-w-64 bg-transparent hidden md:block">
	<SidebarWrapper>
		<SidebarGroup>
			{#each options[option] as { label, href }}
			<!-- Badge next to SidebarItem -->
			{#if (label === "My Worker Profile") && activeUrl === "/protected/settings/profile"}
			<a class="flex items-center mb-2" href={href}>
				<SidebarItem
					{label}
					{href}
					on:click={(e) => {
						e.preventDefault(); // Prevent default behavior
						handleNavigation(href);
						closeDrawer(); // Close drawer after navigation
					}}
					class="flex-1"
				/>
				<div class="flex items-center ml-2">
					{#key profileCompletion}
					<Badge color={profileCompletion} class="ml-2">
						{profileCompletion === "green" ? 'DONE' : 'TODO'}	
					</Badge>	
					{/key}
					
				</div>
			</a>
			{:else}
				<SidebarItem
					{label}
					{href}
					on:click={(e) => {
						e.preventDefault(); // Prevent default behavior
						handleNavigation(href);
						closeDrawer(); // Close drawer after navigation
					}}
					class="flex-1"
				/>
			{/if}
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<!-- Mobile-only sliding drawer sidebar -->
<Drawer
	transitionType="fly"
	{transitionParams}
	bind:hidden={hidden2}
	id="sidebar2"
	class="w-50 h-screen"
>
	<div class="flex flex-col h-full">
		<!-- Drawer Header -->
		<div class="flex items-center w-full p-4">
			<h5
				id="drawer-navigation-label-3"
				class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
			>
				{capitalize(option === 'sharing' ? 'stories' : option)}
			</h5>
			<CloseButton on:click={() => (hidden2 = true)} class="ml-auto dark:text-white" />
		</div>

		<!-- Sidebar Items -->
		<Sidebar {activeUrl} class="flex-1 bg-gray-50">
			<SidebarWrapper>
				<SidebarGroup>
					{#each options[option] as { label, href }}
					<!-- Badge next to SidebarItem -->
				{#if (label === "My Worker Profile") && activeUrl === "/protected/settings/profile"}
			<a class="flex items-center mb-2" href={href}>
				<SidebarItem
					{label}
					{href}
					on:click={(e) => {
						e.preventDefault(); // Prevent default behavior
						handleNavigation(href);
						closeDrawer(); // Close drawer after navigation
					}}
					class="flex-1"
				/>
				<div class="flex items-center ml-2">
					{#key profileCompletion}
					<Badge color={profileCompletion} class="ml-2">
						{profileCompletion === "green" ? 'DONE' : 'TODO'}	
					</Badge>	
					{/key}
					
				</div>
			</a>
			{:else}
				<SidebarItem
					{label}
					{href}
					on:click={(e) => {
						e.preventDefault(); // Prevent default behavior
						handleNavigation(href);
						closeDrawer(); // Close drawer after navigation
					}}
					class="flex-1"
				/>
			{/if}
					{/each}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>

		<!-- Home button at the bottom of the Drawer -->
		<div class="p-4 flex flex-row items-center space-x-4">
			<a href="/protected" class="block">
				<div class="h-10 w-10 rounded-lg overflow-hidden">
					<img src="/logo.png" alt="Logo" class="h-full w-full object-cover" />
				</div>
			</a>
			<Button
				on:click={() => {
					goto('/protected');
				}}
				class="w-full text-sm rounded-lg bg-black text-white hover:bg-gray-800"
			>
				Home
			</Button>
		</div>
	</div>
</Drawer>
