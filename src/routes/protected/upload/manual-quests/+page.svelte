<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";
    import { currentDate } from '$lib/utils'
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";

    updateTitle(capitalize($page.data.user?.platform) + " Quest Upload");

    let successMessage = '';
    let errorMessage = '';

    let rewardError = ""
    let baseError = ""

    let start_date = currentDate
    let end_date = currentDate

    // Uber Expenses
    let questData = {
        type: 'quest',
        start_date: new Date(),
        end_date: new Date(),
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
        uid: $page.data.user?.uid
    }

    async function submitManualQuest() {
        if (questData.baseTrips === 0) {
            baseError = "Please Enter the Base Number of Trips"
        }
        else {
            baseError = ""
        }
        if (questData.rewardForTrips === 0) {
            rewardError = "Please Enter the Reward"
        }
        else {
            rewardError = ""
        }
        if (rewardError !== "" || baseError !== "") {
            return
        }
        const collectionRef = collection(db, "upload", "manual", "entries")
        const docRef = doc(collectionRef) // Separate by gig work manual inputs?
        questData.start_date = new Date(start_date)
        questData.end_date = new Date(end_date)
        setDoc(docRef, questData, { merge: true });
        successMessage = "Input Submitted Successfully!"
    }

</script>
    <div class="p-8 flex flex-col items-center w-full">

        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Start Date</Label>
                <Input type="date" bind:value={start_date} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Start Time</Label>
                <Input type="time" bind:value={questData.startTime} class="mt-1" />
            </div>
            <div class="flex flex-col">
                <Label>End Date</Label>
                <Input type="date" bind:value={end_date} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>End Time</Label>
                <Input type="time" bind:value={questData.endTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Base # Trips</Label>
                <p class="text-red-500">{baseError}</p>
                <NumberInput bind:value={questData.baseTrips} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Reward for Base # of Trips</Label>
                <p class="text-red-500">{rewardError}</p>
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