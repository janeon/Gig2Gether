<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<div class="w-1/4">
    <Sidebar {activeUrl}>
        <SidebarWrapper>
            <SidebarGroup>
                <SidebarItem label="My Account" href="/protected/account"/>
                <SidebarItem label="My Worker Profile" href="/protected/profile"/>
                <SidebarItem label="Demographics" href="/protected/demographics"/>
                <SidebarItem label="Sharing Preferences" href="/protected/sharing_preferences"/>
                <SidebarItem label="Withdraw Data"/>
                <SidebarItem label="Notification"/>
              </SidebarGroup>
        </SidebarWrapper>    </Sidebar>

</div>


