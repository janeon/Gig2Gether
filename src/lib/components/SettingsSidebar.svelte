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
      console.log("mobile", mobile)
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
    
</script>

<!-- <div class={mobile ? 'block md:hidden' : 'hidden'}> -->
  <header class={'block md:hidden'}>
    <Button on:click={() => (hidden2 = false)} 
      class="bg-transparent text-black !outline-none shadow-none p-2 text-lg">
        <i class="fas fa-bars text-xl"/> 
    </Button>
    <!-- <div>
      <h1 class="text-lg font-bold"></h1>
    </div> -->
  </header>
  <!-- mobile version -->
<!-- <div class={mobile ? 'hidden md:block': 'block'}> -->
  <!-- web testing version -->
  <div class={'hidden md:block'}>
    <Sidebar {activeUrl} class="w-64 bg-gray-100">
        <SidebarWrapper>
          <SidebarGroup>
            {#each settings as { label, href }}
              <SidebarItem label={label} href={href} on:click={closeDrawer} />
            {/each}
          </SidebarGroup>
        </SidebarWrapper>
      </Sidebar>
  </div>
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
      <div class="flex items-center">
        <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Settings</h5>
        <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
      </div>
      <!-- Sidebar for medium and large screens -->
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