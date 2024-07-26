<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Drawer, CloseButton, Button } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
    import { sineIn } from 'svelte/easing';
    import '@fortawesome/fontawesome-free/css/all.min.css';
	  import UploadSidebar from './UploadSidebar.svelte';

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
            { label: "My Account", href: "/protected/settings/account" },
            { label: "My Worker Profile", href: "/protected/settings/profile" },
            { label: "Demographics", href: "/protected/settings/demographics" },
            { label: "Sharing Preferences", href: "/protected/settings/sharing_preferences" },
            { label: "Withdraw Data" },
            { label: "Notification" }
          ]
    const sharing = [
      { label: "Story Feed", href: "/protected/stories/story_feed" },
      { label: "Share Story", href: "/protected/stories/share_story" }
    ]
    
    const options = {"settings": settings, "sharing": sharing};
    export let option: string;
    export let title: string;
    
</script>

  <!-- Hamburger button for smaller screensize -->
  <div class="relative flex items-center pt-3">
    <Button 
      on:click={() => (hidden2 = false)} 
      class="absolute left-0 text-center font-medium focus-within:ring-4 focus-within:outline-none flex items-center pl-5 pr-3 py-3 text-sm hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg bg-transparent text-black block md:hidden h-12">
      <div class="flex items-center space-x-4">
        <i class="fas fa-bars text-2xl mb-2"></i>
      </div>
    </Button>
    
    <div class="flex-1 flex justify-center">
    {#if mobile}
      <h1 class="text-lg font-bold">{title}</h1>
    {/if}
    </div>
  </div>
    
  <!-- Sidebar for medium and large screens -->
    {#if option == "upload"}
      <UploadSidebar/>
    {:else}
      <Sidebar {activeUrl} class="w-64 bg-transparent hidden md:block">
        <SidebarWrapper>
          <SidebarGroup>
            {#each options[option] as { label, href }}
              <SidebarItem label={label} href={href} on:click={closeDrawer} />
            {/each}
          </SidebarGroup>
        </SidebarWrapper>
      </Sidebar>
    {/if }
  <!-- mobile version drawer only -->
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
      <div class="flex items-center">
        <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Settings
        </h5>
        <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
      </div>
      {#if option == "upload"}
      <UploadSidebar/>
      {:else}

      <Sidebar {activeUrl} class="w-64 bg-gray-100">
        <SidebarWrapper>
          <SidebarGroup>
            {#each options[option] as { label, href }}
              <SidebarItem label={label} href={href} on:click={closeDrawer} />
            {/each}
          </SidebarGroup>
        </SidebarWrapper>
      </Sidebar>
      {/if }
  </Drawer>