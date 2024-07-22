<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper, Drawer, CloseButton } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
    import { sineIn } from 'svelte/easing';
	import { Button } from './ui/button';
    import '@fortawesome/fontawesome-free/css/all.min.css';

    let hidden2 = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    
</script>

<div>
    <Button on:click={() => (hidden2 = false)} class="bg-transparent text-black">
        <i class="fas fa-bars"></i> 
    </Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
    <div class="flex items-center">
      <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
    </div>
    <!-- Sidebar for medium and large screens -->
    <Sidebar {activeUrl} class="hidden md:block w-64 bg-gray-100">
      <SidebarWrapper>
        <SidebarGroup>
          <SidebarItem label="My Account" href="/protected/settings/account"/>
          <SidebarItem label="My Worker Profile" href="/protected/settings/profile"/>
          <SidebarItem label="Demographics" href="/protected/settings/demographics"/>
          <SidebarItem label="Sharing Preferences" href="/protected/settings/sharing_preferences"/>
          <SidebarItem label="Withdraw Data"/>
          <SidebarItem label="Notification"/>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
</Drawer>