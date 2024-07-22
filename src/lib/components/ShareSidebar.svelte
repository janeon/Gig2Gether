<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

    $: activeUrl = $page.url.pathname;
</script>

<div class="w-1/4">
    <Sidebar {activeUrl}>
        <SidebarWrapper>
            <SidebarGroup>
                <SidebarItem label="Story Feed" href="/protected/stories/story_feed"/>
                <SidebarItem label="Share Story" href="/protected/stories/share_story"/>
              </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>
