<script lang="ts">
    import { page } from "$app/stores";
    import { db } from "$lib/firebase/client";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { Label, Input, NumberInput } from "flowbite-svelte";
    import { currentDate, currentTime, extractAfterEquals } from '$lib/utils';
    import IconNumberInput from "$lib/components/IconNumberInput.svelte";
    import { updateTitle } from "$lib/stores/title";
    import { capitalize } from "$lib/utils";
    import { goto } from "$app/navigation";
    import Duration from "$lib/components/Duration.svelte";
    updateTitle(capitalize($page.data.user?.platform) + ' Quests');
    let successMessage = '';
    let errorMessage = '';
    let docID: string | null = null;

    let rewardError = "";
    let baseError = "";

    let questData = {
        type: 'quest',
        date: currentDate,
        end_date: currentDate,
        startTime: currentTime,
        endTime: currentTime,
        baseTrips: null,
        rewardForTrips: null,
        rewardForBonusTrips: null,
        hoursSince: { hours: null, minutes: null },
        tripsCompleted: null,
        earnings: null,
        distance: null,
        tips: null,
        uid: $page.data.user?.uid
    };

    let initialData = { ...questData };

    $: dataChanged = JSON.stringify(questData) !== JSON.stringify(initialData);

    async function submitManualQuest() {
        baseError = questData.baseTrips ? "" : "Please Enter the Base Number of Trips";
        rewardError = questData.rewardForTrips ? "" : "Please Enter the Reward";

        if (baseError || rewardError) {
            return;
        }

        ['rewardForTrips', 'rewardForBonusTrips', 'earnings', 'tips'].forEach(property => {
            if (questData[property] !== null) {
                questData[property] = extractAfterEquals(questData[property]);
            }
        });

        const collectionRef = collection(db, "upload", "manual", "entries");
        const docRef = doc(collectionRef);
        await setDoc(docRef, questData, { merge: true });
        docID = docRef.id;
        initialData = { ...questData };
        successMessage = "Quest Submission Successful!";
    }

</script>

<div class="flex flex-row">
    <div class="py-2 flex flex-col items-center w-full">
        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Start Date</Label>
                <Input type="date" bind:value={questData.date} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Start Time</Label>
                <Input type="time" bind:value={questData.startTime} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>End Date</Label>
                <Input type="date" bind:value={questData.end_date} class="mt-1" />
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
                <IconNumberInput bind:value={questData.rewardForTrips} className="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Reward for Bonus Trips</Label>
                <IconNumberInput bind:value={questData.rewardForBonusTrips} className="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Time Since Beginning of Quest</Label>
                <Duration bind:hours={questData.hoursSince.hours} bind:minutes={questData.hoursSince.minutes} className="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label># Trips Completed</Label>
                <NumberInput bind:value={questData.tripsCompleted} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Earnings</Label>
                <IconNumberInput bind:value={questData.earnings} className="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Distance (miles)</Label>
                <NumberInput bind:value={questData.distance} class="mt-1" />
            </div>

            <div class="flex flex-col">
                <Label>Tips</Label>
                <IconNumberInput bind:value={questData.tips} className="mt-1" />
            </div>

            <div class="flex justify-center mt-2">
                {#if successMessage}
                    <p class="text-green-600 mt-2">{successMessage}</p>
                    {/if}
                    {#if errorMessage}
                    <p class="text-red-600 mt-2">{errorMessage}</p>
                {/if}
            </div>

            <div class="flex flex-row items-center gap-4 mt-6">
                <button
                    class={`flex-1 py-2 rounded ${dataChanged ? 'bg-black text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'} text-sm md:text-base lg:text-lg truncate`}
                    on:click={submitManualQuest}>
                    Submit
                </button>
            {#if docID}
            <button
                class="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm md:text-base lg:text-base truncate"
                on:click={() => goto("/protected/trends/personal")}
                style="min-width: 120px;">
                See in Trends
            </button>
            {/if}
            </div>
        </div>
    </div>
</div>