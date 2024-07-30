<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, NumberInput, Input } from "flowbite-svelte";
    import { currentDate } from '$lib/utils'


    let successMessage = '';
    let errorMessage = '';

    let fareError = ""

    let date = currentDate

    // Uber Expenses
    let tripData = {
        date: new Date(),
        type: "trip",
        fare: 0,
        surge: 0,
        tips: 0,
        waitTimeBonus: 0,
        boost: 0,
        withholdingsPercent: 0,
        uid: $page.data.user?.uid
    }

    async function submitManualTrip() {
        if (tripData.fare === 0) {
            fareError = "Please Enter a Fare"
            return
        }
        fareError = ""
        const collectionRef = collection(db, "upload", "manual", "entries")
        const docRef = doc(collectionRef); // Separate by gig work manual inputs?
        tripData.date = new Date(date)
        setDoc(docRef, tripData, { merge: true });
        successMessage = 'Input Submitted Successfully!';
    }

</script>

    <div class="p-8 flex flex-col items-center w-full">
        <h1 class="text-2xl font-bold mb-6">Manual Trip Input</h1>

        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Date</Label>
                <Input type="date" bind:value={date} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Fare</Label>
                <p class="text-red-500">{fareError}</p>
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

            {#if successMessage}
                <p class="text-green-600 mt-2">{successMessage}</p>
            {/if}
            {#if errorMessage}
                <p class = "text-red-600 mt-2">{errorMessage}</p>
            {/if}
            <div class="flex justify-center mt-6">
                <button
                    class="bg-black text-white py-2 px-4 rounded"
                    on:click={submitManualTrip}>
                    Submit
                </button>
            </div>
        </div>
    </div>