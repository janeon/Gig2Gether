<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { Data } from "$lib/types";

    import { Button, Modal } from "flowbite-svelte";
    import BlueButton from "$lib/components/BlueButton.svelte";
    import DataRow from "$lib/components/DataRow.svelte";
    
    import { db } from "$lib/firebase/client.js";
    import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
	import { updateTitle } from "$lib/stores/title.js";
    
    export let data

    updateTitle("Manage Stories");

    let toDelete : Data[] = []
    let modal = false
    const deleteData = async () => {
    for (let dataDoc of toDelete) {
        let docRef: any;
        let newDocRef: any;

        switch (dataDoc.type) {
            case "Story":
                docRef = doc(db, 'stories', data.user.platform, "posts", dataDoc.id);
                newDocRef = doc(db, 'logging', 'stories', data.user.platform, "posts", dataDoc.id);
                break;
        }

        // Retrieve the document data
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const docData = docSnap.data();

            // Add the document to the new collection
            await setDoc(newDocRef, docData);

            // Delete the document from the current collection
            await deleteDoc(docRef);
        }
    }

    invalidateAll();
};
</script>

<div class="justify-items-center py-2 max-w-lg mx-auto">
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <DataRow bind:checkBind={toDelete} docInfo={post}/>
        {/each}        
    {/if}
    <div class="flex justify-center py-4">
        <BlueButton onclick={()=>{if (toDelete.length > 0) {modal=true}}} buttonText="Delete Data" />
    </div>
    <Modal title="Are you sure you want to delete the story(s)?" bind:open={modal} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Deleting the story(s) will permanently remove it/tehm from your (and others') feed. 
            To see it again, you would need to reupload all included content.</p>
        <div class="flex flex-row space-x-2">
            <Button color="red" on:click={deleteData}>Yes I'm Sure</Button>
            <Button color="dark">Change My Selection</Button>
        </div>
    </Modal>
</div>