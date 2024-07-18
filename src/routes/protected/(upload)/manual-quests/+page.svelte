<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/components/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";

    // Uber Expenses
    let questData = {
        startTime: '',
        endTime: '',
        baseTrips: 0,
        rewardForTrips: 0,
        rewardForBonusTrips: 0,
        hoursSince: 0,
        tripsCompleted: 0,
        earnings: 0,
        distance: 0,
        tips: 0,
    }

    async function submitManualQuest() {
        const collectionRef = collection(db, "users", $page.data.user?.uid, "upload");
        const docRef = doc(collectionRef, "Manual Quests"); // Separate by gig work manual inputs?
        setDoc(docRef, questData, { merge: true });
    }
</script>

<div class="flex flex-row">
    <UploadSidebar />
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Manual Quest Input</h1>

        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Start Time</Label>
                <Input type="text" bind:value={questData.startTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>End Time</Label>
                <Input type="text" bind:value={questData.endTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Base # Trips</Label>
                <NumberInput bind:value={questData.baseTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Reward for Base # of Trips</Label>
                <NumberInput bind:value={questData.rewardForTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Reward for Bonus Trips</Label>
                <NumberInput bind:value={questData.rewardForBonusTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Hours Since Beginning of Quest</Label>
                <NumberInput bind:value={questData.hoursSince} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label># Trips Completed</Label>
                <NumberInput bind:value={questData.tripsCompleted} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Earnings</Label>
                <NumberInput bind:value={questData.earnings} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Distance</Label>
                <NumberInput bind:value={questData.distance} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Tips</Label>
                <NumberInput bind:value={questData.tips} class="mt-1" />
            </div>

            <div class="flex justify-center mt-6">
                <button
                    class="bg-black text-white py-2 px-4 rounded"
                    on:click={submitManualQuest}>
                    Submit
                </button>
            </div>
        </div>
    </div>
</div>
