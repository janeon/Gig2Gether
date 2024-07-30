<script lang="ts">
    import DataRow from "$lib/components/DataRow.svelte";
    import { db } from "$lib/firebase/client.js";
    import type { Data } from "$lib/types";
    import { deleteDoc, doc } from "firebase/firestore";
    import { Button, Modal } from "flowbite-svelte";

    export let data

    let toDelete : Data[] = []
    let modal = false
    const deleteData = async()=> {
        for (let dataDoc of toDelete) {
            if (dataDoc.type == "story") {
                const docRef = doc(db, 'stories', data.user.platform, "posts", dataDoc.id)
                await deleteDoc(docRef)
                console.log(docRef)
            }
        }
    }
</script>

<div class="justify-items-center py-2">
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <DataRow bind:checkBind={toDelete} docInfo={post}/>
        {/each}
        
    {/if}
    <p>{toDelete}</p>
    <Button color="alternative" on:click={()=>{if (toDelete.length > 0) {modal=true}}}>Delete Data</Button>
    <Modal title="Are you sure you want to delete these uploads?" bind:open={modal} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">If you delete the selected data, you will have to reupload all content included.</p>
        <div class="flex flex-row space-x-2">
            <Button color="red" on:click={deleteData}>Yes I'm Sure</Button>
            <Button color="dark">Change My Selection</Button>
        </div>
    </Modal>
</div>