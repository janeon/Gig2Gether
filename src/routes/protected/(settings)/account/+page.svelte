<script lang="ts">
    import { page } from "$app/stores";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { Label } from "flowbite-svelte";

    let email = $page.data.user?.email
</script>

<div class = "flex flex-row">
    <Sidebar/>
    <div class = "p-8">
        <h1>My Account</h1>
        <div>
            <Label>My Email</Label>
            <p>{email}</p>
        </div>
        <!-- <div>
            <Label>My Phone</Label>
            <p>{email}</p>
        </div> -->
    </div>
</div>
