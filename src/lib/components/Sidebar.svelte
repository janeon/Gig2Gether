<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Drawer, CloseButton, Button, Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';
    import { sineIn } from 'svelte/easing';
    import '@fortawesome/fontawesome-free/css/all.min.css';
	  import { capitalize } from '$lib/utils';
	  import { enhance } from '$app/forms';
	  import type { ActionData } from '../../routes/protected/$types';
    
    let form : ActionData;
    $: activeUrl = $page.url.pathname;
    let activeClass = 'text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-500';
    let mobile: boolean;
    onMount(() => {
      mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
      // console.log("mobile", mobile)
      ;
    });
    let hidden2 = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    const closeDrawer = () => hidden2 = true;

    const settings = [
            { label: "My Worker Profile", href: "/protected/settings/profile" },
            { label: "My Account", href: "/protected/settings/account" },
            { label: "Demographics", href: "/protected/settings/demographics" },
            { label: "Sharing Preferences", href: "/protected/settings/sharing_preferences" },
            { label: "Withdraw Data", href:"/protected/settings/withdraw"},
            { label: "Notification" }
    ]

    const sharing = [
      { label: "Story Feed", href: "/protected/stories/story_feed" },
      { label: "Share Story", href: "/protected/stories/share_story" }
    ]

    let upload_options = [];

    if ($page.data.user?.platform === "uber") {
      upload_options = [
        { label: "Quests", href: "/protected/upload/quests" },
        { label: "Trips", href: "/protected/upload/trips" }
      ];
    } else if ($page.data.user?.platform === "rover") {
      upload_options = [
        // { label: "Screenshot", href: "/protected/upload/rover-upload" }
        { label: "Manual", href: "/protected/upload/manual" }
      ];
    } else if ($page.data.user?.platform === "upwork") {
      upload_options = [
        { label: "Jobs", href: "/protected/upload/upwork-job" },
        { label: "Profile", href: "/protected/upload/upwork-profile" }
      ];
    }

    // Add common items
    upload_options.push(
      // { label: "Manual", href: "/protected/upload/manual" },
      { label: "Expenses", href: "/protected/upload/expenses" }
    );
    
    const options = {"settings": settings, "sharing": sharing, "upload": upload_options} ;
    export let option: string;
    export let title: string;
    
</script>

  <!-- Hamburger button for smaller screensize -->
  <div class="relative flex items-center py-3">
    {#if mobile}
      <Button 
        on:click={() => (hidden2 = false)} 
        class="absolute left-0 text-center font-medium focus-within:ring-4 
        flex items-center pl-5 pr-3 py-3 
        text-sm rounded-lg bg-transparent text-black block md:hidden h-12">
        <i class="fas fa-bars text-2xl mb-2"></i>
      </Button>
      <h1 
      class="absolute left-1/2 transform -translate-x-1/2 font-bold text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl"
      style="font-size: 0.85rem;">
      {title}
    </h1>
      <div class="ml-auto mr-3 flex items-center">
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
  </div>
  
    
  <!-- Sidebar for medium and large screens -->
  <Sidebar {activeUrl} class="w-64 bg-transparent hidden md:block">
    <SidebarWrapper>
      <SidebarGroup>
        {#each options[option] as { label, href }}
          <SidebarItem label={label} href={href} on:click={closeDrawer} />
        {/each}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
  <!-- mobile-only sliding drawer sidebar -->
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2" class="w-60">
      <div class="flex items-center w-48">
        <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          {capitalize(option)}
        </h5>
        <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
      </div>

    <Sidebar {activeUrl} class="w-48 bg-gray-100">
      <SidebarWrapper>
        <SidebarGroup>
          {#each options[option] as { label, href }}
            <SidebarItem label={label} href={href} on:click={closeDrawer} />
          {/each}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Drawer>