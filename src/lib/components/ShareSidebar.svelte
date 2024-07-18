<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
    <SidebarWrapper>
        <SidebarGroup>
            <SidebarItem label="Share Strategy" href="/protected/stories/share_strategy"/>
            <SidebarItem label="Share Issue" href="/protected/stories/share_issue"/>
            <SidebarItem label="Community Stories" />
          </SidebarGroup>
    </SidebarWrapper>
</Sidebar>