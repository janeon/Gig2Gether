<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
    <SidebarWrapper>
        <SidebarGroup>
            <SidebarItem label="My Trends" href="/protected/trends/my-trends"/>
            <SidebarItem label="Collective Insights" href="/protected/trends/collectiveInsights"/>
          </SidebarGroup>
    </SidebarWrapper>
</Sidebar>