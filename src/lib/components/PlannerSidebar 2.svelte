<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
    <SidebarWrapper>
        <SidebarGroup>
            <SidebarItem label="Work" href="/protected/planner/work-day"/>
            <SidebarItem label="Tax" href="/protected/planner/tax"/>
          </SidebarGroup>
    </SidebarWrapper>
</Sidebar>


