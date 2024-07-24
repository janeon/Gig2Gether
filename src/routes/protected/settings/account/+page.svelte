<script lang="ts">
    import { page } from "$app/stores";
    import { Label } from "flowbite-svelte";
    import { capitalize } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    updateTitle("My Account");
    let username = $page.data.user?.username
    let platform = capitalize($page.data.user?.platform)
    
</script>

<div>
    <Label>My Email/Phone: {username}</Label> 
    <Label>Platform: {platform}</Label> 
</div>
