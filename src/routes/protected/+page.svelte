<script lang="ts">
	import { enhance } from "$app/forms";
  import HomeCard from "$lib/components/HomeCard.svelte";
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-svelte";
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
	import type { ActionData } from "./$types";
  $: activeUrl = $page.url.pathname;
  let activeClass = 'text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-500';

  export let form : ActionData;
  let mobile: boolean;
  onMount(() => {
    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  });
  </script>

  {#if mobile}
  <header class="fixed py-3 w-full bg-gray-100 z-10 flex items-center justify-between h-12">
    <h1 class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold mb-0">Gig2Gether</h1>
    <div class="flex-grow"></div>
    <Avatar class="acs mr-3 w-8 h-8" dot={{ color: 'green' }} border/>
    <Dropdown {activeUrl} {activeClass} triggeredBy=".acs">
      <DropdownHeader>
        <span class="block text-sm text-gray-900 dark:text-white">Username</span>
        <span class="block truncate text-sm font-medium">{$page.data.user?.credentials}</span>
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
  </header>
  {/if}
  <div class="flex flex-col items-center min-h-screen px-4 pt-20"> 
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full">
      {#each [
        { iconClass: 'fa-upload', title: 'Upload', route: '/protected/upload/manual' },
        { iconClass: 'fa-book', title: 'Stories', route: '/protected/stories/story_feed' },
        { iconClass: 'fa-chart-line', title: 'Trends', route: '/protected/trends/personal' },
        { iconClass: 'fa-cog', title: 'Settings', route: '/protected/settings/profile' },
        { iconClass: 'fa-calendar', title: 'Planner', route: '/protected/planner/work-day' }
      ] as { iconClass, title, route }}
        <HomeCard {iconClass} {title} {route} mobile={mobile} />
      {/each}
    </div>
  </div>
  