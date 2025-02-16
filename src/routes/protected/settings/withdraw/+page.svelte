<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { Data } from "$lib/types";

    import { Button, Modal } from "flowbite-svelte";
    import BlueButton from "$lib/components/BlueButton.svelte";
    import DataRow from "$lib/components/DataRow.svelte";
    
    import { db } from "$lib/firebase/client.js";
    import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
	import { updateTitle } from "$lib/stores/title.js";

    updateTitle("Manage Data");

    export let data

    let toDelete : Data[] = []
    let modal = false
    const deleteData = async () => {
    for (let dataDoc of toDelete) {
        let docRef: any;
        let newDocRef: any;

        // Determine the document reference based on its type
        switch (dataDoc.type) {
            case "Story":
                docRef = doc(db, 'stories', data.user.platform, "posts", dataDoc.id);
                newDocRef = doc(db, 'logging', 'stories', data.user.platform, "posts", dataDoc.id);
                break;
            case "Manual":
                docRef = doc(db, 'upload', 'manual', data.user.platform, dataDoc.id);
                newDocRef = doc(db, 'logging', 'manual', data.user.platform, dataDoc.id);
                break;
            case "Expense":
                docRef = doc(db, 'upload', 'expenses', data.user.platform, dataDoc.id);
                newDocRef = doc(db, 'logging', 'expenses', data.user.platform, dataDoc.id);
                break;
            case "Trips":
                docRef = doc(db, 'upload', "manual", 'trips', dataDoc.id);
                newDocRef = doc(db, 'logging', 'trips', dataDoc.id);
                break;
            case "Quests":
                docRef = doc(db, 'upload', "manual", 'quests', dataDoc.id);
                newDocRef = doc(db, 'logging', 'quests', dataDoc.id);
                break;
            case "CSV":
                docRef = doc(db, 'upload', "csv", 'entries', dataDoc.id);
                newDocRef = doc(db, 'logging', "csv", 'entries', dataDoc.id);
                break;
        }

        // Retrieve the document data
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const docData = docSnap.data() as { [key: string]: any };
            docData.deletedAt = new Date().toISOString(); // Add the delete timestamp
            // Add the document to the new collection
            await setDoc(newDocRef, docData);

            // Delete the document from the current collection
            await deleteDoc(docRef);
        }
    }

    invalidateAll();
};
</script>

<div class="justify-items-center py-2">
    {#if data.posts.length > 0}
        {#each data.posts as post}
            <DataRow bind:checkBind={toDelete} docInfo={post}/>
        {/each}        
    {/if}
    <div class="flex justify-center py-4">
        <BlueButton onclick={()=>{if (toDelete.length > 0) {modal=true}}} buttonText="Delete Data" />
    </div>
    <Modal title="Are you sure you want to delete these uploads?" bind:open={modal} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Deleting the selected data will permanently remove it from the database. To see it again in trends, you would need to reupload all content included.</p>
        <div class="flex flex-row space-x-2">
            <Button color="red" on:click={deleteData}>Yes I'm Sure</Button>
            <Button color="dark">Change My Selection</Button>
        </div>
    </Modal>
</div>