<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import BlueButton from "$lib/components/BlueButton.svelte";
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
            let docRef: any;
            switch (dataDoc.type) {
                case "Story":
                    docRef = doc(db, 'stories', data.user.platform, "posts", dataDoc.id)
                    break;
                case "Manual":
                    docRef = doc(db, 'upload', 'manual', 'entries', dataDoc.id)
                    break;
                case "Expense":
                    docRef = doc(db, 'upload', 'expenses', 'entries', dataDoc.id)
                    break;
            }
            await deleteDoc(docRef)
        }
        invalidateAll()
    }
</script>

<div class="justify-items-center py-2">
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <DataRow bind:checkBind={toDelete} docInfo={post}/>
        {/each}
        
    {/if}
    <div class="flex justify-center">
        <BlueButton onclick={()=>{if (toDelete.length > 0) {modal=true}}} buttonText="Delete Data" />
    </div>
    <Modal title="Are you sure you want to delete these uploads?" bind:open={modal} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Deleting the selected data will permanently remove it from the database, to see it again in trends, you would need to reupload all content included.</p>
        <div class="flex flex-row space-x-2">
            <Button color="red" on:click={deleteData}>Yes I'm Sure</Button>
            <Button color="dark">Change My Selection</Button>
        </div>
    </Modal>
</div>