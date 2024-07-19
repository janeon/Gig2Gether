<script lang="ts">
    import { page } from "$app/stores";
    import { Label } from "flowbite-svelte";

    let email = $page.data.user?.email
</script>

<h1>My Account</h1>
<div>
    <Label>My Email</Label>
    <p>{email}</p>
</div>
<!-- <div>
    <Label>My Phone</Label>
    <p>{email}</p>
</div> -->
