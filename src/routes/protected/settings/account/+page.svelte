<script lang="ts">
    import { page } from "$app/stores";
    import { Label } from "flowbite-svelte";

    let username = $page.data.user?.username
    export const title = "My Account"
</script>

<h1>{title}</h1>
<div>
    <Label>My Email/Phone</Label>
    <p>{username}</p>
</div>
<!-- <div>
    <Label>My Phone</Label>
    <p>{email}</p>
</div> -->
