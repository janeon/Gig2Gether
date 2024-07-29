<script lang="ts">
    import { page } from "$app/stores";
    import { Label } from "flowbite-svelte";
    import { capitalize } from "$lib/utils";
    import { updateTitle } from "$lib/stores/title";
    updateTitle("My Account");
    let username = $page.data.user?.username
    let platform = capitalize($page.data.user?.platform)
    
</script>

<div class="py-5">
    <Label class="block mb-4">
        My Email/Phone: {username}</Label>
    <Label class="block">
        Platform: {platform}</Label>
</div>
<!-- <div>
    <Label>My Phone</Label>
    <p>{email}</p>
</div> -->
