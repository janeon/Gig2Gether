<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase";
    import Sidebar from "$lib/Sidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Checkbox } from "flowbite-svelte";

    let email = $page.data.user?.email

    let toShare : string[] = []
    const sharingOptions = [{
        value : "me", label: "Me, myself, and I"
    },
    {
        value: "workers", label: "Other workers"
    },
    {
        value: "researchers", label: "Researchers"
    },
    {
        value: "policymakers", label: "Policymakers"
    }
    ]

    async function submitPreferences() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "settings")
        const docRef = doc(collectionRef, "sharing")
        setDoc(docRef, {
            include: toShare
        }, {merge: true})
    }
</script>

<div class = "flex flex-row">
    <Sidebar/>
    <div class = "p-8">
        <h1>Who Would You Like to Share Your Worker Data With?</h1>
        <Checkbox bind:group={toShare} choices={sharingOptions} />
    </div>
    <button on:click = {submitPreferences}>Submit</button>

</div>