<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper} from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
    import { sineIn } from 'svelte/easing';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import { onMount } from 'svelte';

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
            { label: "Withdraw Data", href:"/protected/settings/withdraw" },
            { label: "Notification" }
          ]

    export let title: string;
    
</script>

<div class="flex w-1/4">
    <Sidebar {activeUrl}>
        <SidebarWrapper>
            <SidebarGroup>
                <SidebarItem label="My Account" href="/protected/settings/account"/>
                <SidebarItem label="My Worker Profile" href="/protected/settings/profile"/>
                <SidebarItem label="Demographics" href="/protected/settings/demographics"/>
                <SidebarItem label="Sharing Preferences" href="/protected/settings/sharing_preferences"/>
                <SidebarItem label="Withdraw Data" href="/protected/settings/withdraw"/>
                <SidebarItem label="Notification"/>
              </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>