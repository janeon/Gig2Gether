<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Drawer, CloseButton, Button } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
    import { sineIn } from 'svelte/easing';
    import '@fortawesome/fontawesome-free/css/all.min.css';

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

    let settings = [
            { label: "My Account", href: "/protected/settings/account" },
            { label: "My Worker Profile", href: "/protected/settings/profile" },
            { label: "Demographics", href: "/protected/settings/demographics" },
            { label: "Sharing Preferences", href: "/protected/settings/sharing_preferences" },
            { label: "Withdraw Data" },
            { label: "Notification" }
          ]

    export let title: string;
    
</script>

  <!-- Hamburger button for smaller screensize -->
    <Button 
      on:click={() => (hidden2 = false)} 
      class="text-center font-medium focus-within:ring-4 focus-within:outline-none flex flex-col items-center pl-5 pr-3 py-3 text-sm hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 focus-within:ring-primary-300 dark:focus-within:ring-primary-800 rounded-lg bg-transparent text-black block md:hidden h-12">
      <div class="flex items-center space-x-4">
        <i class="fas fa-bars text-2xl mb-2"></i>
        {#if mobile}
        <h1 class="text-lg font-bold">{title}</h1>
        {/if}
      </div>
    </Button>
    
  <!-- Sidebar for medium and large screens -->
    <Sidebar {activeUrl} class="w-64 bg-gray-100 hidden md:block">
      <SidebarWrapper>
        <SidebarGroup>
          {#each settings as { label, href }}
            <SidebarItem label={label} href={href} on:click={closeDrawer} />
          {/each}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>

  <!-- mobile version drawer only -->
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
      <div class="flex items-center">
        <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Settings
        </h5>
        <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
      </div>
      <Sidebar {activeUrl} class="w-64 bg-gray-100">
        <SidebarWrapper>
          <SidebarGroup>
            {#each settings as { label, href }}
              <SidebarItem label={label} href={href} on:click={closeDrawer} />
            {/each}
          </SidebarGroup>
        </SidebarWrapper>
      </Sidebar>
  </Drawer>