<script lang="ts">
    import { page } from '$app/stores';
    import { P, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    
    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl}>
    <SidebarWrapper>
        <SidebarGroup>
                <!-- // Uber -->
            {#if $page.data.user?.platform == "uber"}
            <SidebarItem label="Quests" href="/protected/quests"/>
            <SidebarItem label="Trips" href="/protected/trips"/>
            {/if}
            
                 <!-- // Rover -->
            {#if $page.data.user?.platform == "rover"}
            <SidebarItem label="Screenshot" href="/protected/rover-upload"/>
            {/if}

                 <!-- // UpWork -->
            {#if $page.data.user?.platform == "upwork"}
            <SidebarItem label="Jobs" href="/protected/upwork-job"/>
            <SidebarItem label="Pofile" href="/protected/upwork-profile"/>
            {/if}
            
            <SidebarItem label="Manual" href="/protected/manual"/>
            <SidebarItem label="Expenses" href="/protected/expenses"/>
    
          </SidebarGroup>
    </SidebarWrapper>
</Sidebar>

<div>
    
</div>