<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput } from "flowbite-svelte";

    // Uber Expenses
    let tripData = {
        fare: 0,
        surge: 0,
        tips: 0,
        waitTimeBonus: 0,
        boost: 0,
        withholdingsPercent: 0,
    }

    async function submitManualTrip() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "upload");
        const docRef = doc(collectionRef, "Manual Trips"); // Separate by gig work manual inputs?
        setDoc(docRef, tripData, { merge: true });
    }
</script>

<div class="flex flex-row">
    <UploadSidebar />
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Manual Trip Input</h1>

        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Fare</Label>
                <NumberInput bind:value={tripData.fare} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Surge</Label>
                <NumberInput bind:value={tripData.surge} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Tips</Label>
                <NumberInput bind:value={tripData.tips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Wait Time Bonus</Label>
                <NumberInput bind:value={tripData.waitTimeBonus} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Promotion/Boost</Label>
                <NumberInput bind:value={tripData.boost} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Percentage of Uber Fees/Withholdings</Label>
                <NumberInput bind:value={tripData.withholdingsPercent} class="mt-1" />
            </div>

            <div class="flex justify-center mt-6">
                <button
                    class="bg-black text-white py-2 px-4 rounded"
                    on:click={submitManualTrip}>
                    Submit
                </button>
            </div>
        </div>
    </div>
</div>
