<script lang="ts">
    import type { Data } from "$lib/types";

    import BlueButton from "$lib/components/BlueButton.svelte";
    import DataRow from "$lib/components/DataRow.svelte";
    
    import { updateTitle } from "$lib/stores/title.js";
	import { _load } from "./+page.js";
	import type { User } from "../../../app.js";

    updateTitle("Manage Data");

    let posts: any[] = [];

    let toDelete : Data[] = []

    async function setUser() {
        const user: User = {
        uid: "spp8He2nTlQvsshggYloBoeHsIf1",
        role: "",
        credentials: "",
        username: "",
        platform: "uber",
        };
        posts = (await _load(user)).posts
    }
</script>

<BlueButton onclick={setUser} buttonText="Set User"/>
<div class="justify-items-center py-2">
    {#if posts.length > 0}
        {#each posts as post}
            <DataRow bind:checkBind={toDelete} docInfo={post}/>
        {/each}        
    {/if}
</div>