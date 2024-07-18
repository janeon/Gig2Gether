<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";


    let successMessage = '';
    let errorMessage = '';

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
        successMessage = "Input Submitted Successfully!"
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
                {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
                {/if}
                {#if errorMessage}
                 <p class = "text-red-600 mt-2">{errorMessage}</p>
                {/if}
            </div>
        </div>
    </div>
</div>

<!-- <script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import UploadSidebar from "$lib/UploadSidebar.svelte";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";

    let successMessage = '';
    let errorMessage = '';

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
        try {
            const collectionRef = collection(db, "users", $page.data.user?.uid, "upload");
            const docRef = doc(collectionRef, "Manual Quests");
            await setDoc(docRef, questData, { merge: true });
            successMessage = "Input Submitted Successfully!";
            errorMessage = '';
        } catch (error) {
            console.error("Error submitting input:", error);
            errorMessage = "Error submitting input.";
            successMessage = '';
        }
    }
</script>

<div class="flex flex-row">
    <UploadSidebar />
    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Manual Quest Input</h1>

        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label for="startTime">Start Time</Label>
                <Input id="startTime" name="startTime" type="text" bind:value={questData.startTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="endTime">End Time</Label>
                <Input id="endTime" name="endTime" type="text" bind:value={questData.endTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="baseTrips">Base # Trips</Label>
                <NumberInput id="baseTrips" name="baseTrips" bind:value={questData.baseTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="rewardForTrips">Reward for Base # of Trips</Label>
                <NumberInput id="rewardForTrips" name="rewardForTrips" bind:value={questData.rewardForTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="rewardForBonusTrips">Reward for Bonus Trips</Label>
                <NumberInput id="rewardForBonusTrips" name="rewardForBonusTrips" bind:value={questData.rewardForBonusTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="hoursSince">Hours Since Beginning of Quest</Label>
                <NumberInput id="hoursSince" name="hoursSince" bind:value={questData.hoursSince} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="tripsCompleted"># Trips Completed</Label>
                <NumberInput id="tripsCompleted" name="tripsCompleted" bind:value={questData.tripsCompleted} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="earnings">Earnings</Label>
                <NumberInput id="earnings" name="earnings" bind:value={questData.earnings} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="distance">Distance</Label>
                <NumberInput id="distance" name="distance" bind:value={questData.distance} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label for="tips">Tips</Label>
                <NumberInput id="tips" name="tips" bind:value={questData.tips} class="mt-1" />
            </div>

            <div class="flex justify-center mt-6">
                <button
                    class="bg-black text-white py-2 px-4 rounded"
                    on:click={submitManualQuest}>
                    Submit
                </button>
                {#if successMessage}
                    <p class="text-green-600 mt-2">{successMessage}</p>
                {/if}
                {#if errorMessage}
                    <p class="text-red-600 mt-2">{errorMessage}</p>
                {/if}
            </div>
        </div>
    </div>
</div> -->
