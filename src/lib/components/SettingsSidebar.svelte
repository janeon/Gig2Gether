<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
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