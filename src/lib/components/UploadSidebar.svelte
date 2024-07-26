<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    
    $: activeUrl = $page.url.pathname;
</script>

<Sidebar {activeUrl} class="w-64 bg-transparent hidden md:block">
    <SidebarWrapper>
        <SidebarGroup>
                <!-- // Uber -->
            {#if $page.data.user?.platform == "uber"}
            <SidebarItem label="Quests" href="/protected/upload/quests"/>
            <SidebarItem label="Trips" href="/protected/upload/trips"/>
            {/if}
            
                 <!-- // Rover -->
            {#if $page.data.user?.platform == "rover"}
            <SidebarItem label="Screenshot" href="/protected/upload/rover-upload"/>
            {/if}

                 <!-- // Upwork -->
            {#if $page.data.user?.platform == "upwork"}
            <SidebarItem label="Jobs" href="/protected/upload/upwork-job"/>
            <SidebarItem label="Profile" href="/protected/upload/upwork-profile"/>
            {/if}
            
            <SidebarItem label="Manual" href="/protected/upload/manual"/>
            <SidebarItem label="Expenses" href="/protected/upload/expenses"/>
    
          </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
