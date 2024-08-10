<script lang="ts">
    import { page } from '$app/stores';
    import { db } from '$lib/firebase/client';
    import { collection, doc, setDoc } from 'firebase/firestore';
    import { goto } from '$app/navigation';
    import MultiSelect from 'svelte-multiselect';
    import { Label, Input, Select } from 'flowbite-svelte';
    import { currentDate, extractAfterEquals } from '$lib/utils';
    import { updateTitle } from '$lib/stores/title';
    import { capitalize } from '$lib/utils';
    import IconNumberInput from '$lib/components/IconNumberInput.svelte';
    import Duration from '$lib/components/Duration.svelte';
    updateTitle(capitalize($page.data.user?.platform) + ' Manual Upload');
    import job_categories from "$lib/job_categories.json";

    let successMessage = '';
    let errorMessage = '';
    let timeError = '';
    let typeError = '';
    let incomeError = '';
    let dateError = '';

    // Platform specific data stuff
    const baseData = {
        date: currentDate, // Default start date
        end_date: currentDate, 
        uid: $page.data.user.uid
    };

    const roverData = {
        ...baseData,
        income: null,
        tips: null,
        platformCut: null,
        workedHours: null,
        workedMinutes: null,
        travelHours: null,
        travelMinutes: null,
        type: []
    };
    
    const roverServices = [
        'Boarding',
        'House Sitting',
        'Drop-In Visits',
        'Doggy Day Care',
        'Dog Walking'
    ];

    const upworkData = {
        ...baseData,
        type: [],
        hourlyCharge: null,
        jobDuration: { hours: null, minutes: null }, // Updated to use Duration type
        clientLocation: '',
        hoursPerWeek: { hours: null, minutes: null }, // Updated to use Duration type
        clientHistory: '',
        experience: []
    };

    const upworkExperience = [
        {value: "entry", name:'Entry-Level'},
        {value: "intermediate", name:'Intermediate'},
        {value: "expert", name:'Expert'}
    ];

    const upworkJobCategories = Object.keys(job_categories);

    // Document tracking stuff
    let docID: string | null = null;
    let initialData = $page.data.user?.platform == "rover" ? { ...roverData } : { ...upworkData };
    // Track if data has changed
    $: dataChanged = JSON.stringify($page.data.user?.platform == "rover" ? roverData:upworkData) !== JSON.stringify(initialData);

    async function submitManual() {
        if ($page.data.user) {
            const platform = $page.data.user.platform;

            // Reset error messages
            timeError = '';
            incomeError = '';
            typeError = '';
            dateError = '';

            const checkErrors = (errors: { field: any; message: string; type: string }[]) => {
                let hasError = false;
                errors.forEach((error) => {
                    if (!error.field) {
                        hasError = true;
                        if (error.type === 'type') {
                            typeError = error.message;
                        } else if (error.type === 'income') {
                            incomeError = error.message;
                        } else if (error.type === 'time') {
                            // Special handling for timeError
                            if ((roverData.workedHours === null && roverData.workedMinutes === null) || 
                                (upworkData.hoursPerWeek.hours === null && upworkData.hoursPerWeek.minutes === null)) {
                                timeError = error.message;
                            }
                        } else if (error.type === 'date') {
                            dateError = error.message;
                        }
                    }
                });
                return hasError;
            };

            const errorChecks = {
                rover: [
                    { field: roverData.income, message: 'Please Add Income', type: 'income' },
                    { field: roverData.type.length, message: 'Please Add Service(s)', type: 'type' },
                    { field: roverData.workedHours || roverData.workedMinutes, message: 'Please Add Time Spent Working', type: 'time' },
                    { field: new Date(roverData.date) <= new Date(roverData.end_date), message: 'Start date cannot be after end date', type: 'date' }
                ],
                upwork: [
                    { field: upworkData.hourlyCharge, message: 'Please Add Hourly Rate', type: 'income' },
                    { field: upworkData.type.length, message: 'Please Add Job Category', type: 'type' },
                    { field: upworkData.hoursPerWeek.hours || upworkData.hoursPerWeek.minutes, message: 'Please Add Hours Spent per Week', type: 'time' }
                ]
            };

            const errors = errorChecks[platform];
            if (errors && checkErrors(errors)) {
                return;
            }
        }

        const platform = $page.data.user.platform;
        const collectionRef = collection(db, 'upload', 'manual', platform);

        const roverMoneyFields = ['income', 'platformCut', 'tips'];
        roverMoneyFields.forEach(property => {
            console.log(property, roverData[property]);
            if (roverData[property] !== null) {
                roverData[property] = extractAfterEquals(roverData[property]);
            }
        });
        upworkData.hourlyCharge = extractAfterEquals(upworkData.hourlyCharge);

        const docRef = doc(collectionRef);
        const updateDataObject = (platform: string) => {
            const dataObjects = {
                rover: {
                    ...roverData,
                },
                upwork: {
                    ...upworkData,
               }
            };
            const dataToUpdate = dataObjects[platform];
            if (dataToUpdate) {
                setDoc(docRef, dataToUpdate, { merge: true });
                successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
		        docID = docRef.id;
                // Update initial data after successful submission
                initialData = { ...dataToUpdate };         
            }
        };
        updateDataObject($page.data.user?.platform);
    }
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
        <div class="w-full max-w-md space-y-5">
            <div class="flex flex-col">
                <Label>Start Date</Label>
                <Input type="date" bind:value={baseData.date} class="mt-1 min-h-5" />
            </div>
            <p class="text-red-500">{dateError}</p>
            <div class="flex flex-col">
                <Label>End Date</Label>
                <Input type="date" bind:value={baseData.end_date} class="m-1 min-h-5" />
            </div>
        </div>
        {#if $page.data.user?.platform == 'rover'}
            <div class="w-full max-w-md space-y-5">
				<div class="flex flex-col">
					<Label>Income</Label>
					<p class="text-red-500">{incomeError}</p>
                    <IconNumberInput bind:value={roverData.income} className="mt-1" />
				</div>

                <div class="flex flex-col">
					<Label>Platform Cut</Label>
                    <IconNumberInput bind:value={roverData.platformCut} className="mt-1" />
				</div>

				<div class="flex flex-col">
					<Label>Tips</Label>
                    <IconNumberInput bind:value={roverData.tips} className="mt-1" />
				</div>

				<div class="flex flex-col">
					<Label>Time Spent Working</Label>
					<p class="text-red-500">{timeError}</p>
					<Duration bind:hours={roverData.workedHours} bind:minutes={roverData.workedMinutes} />
				</div>

				<div class="flex flex-col">
                    <Label>Time Spent Traveling to Gig</Label>
                    <Duration bind:hours={roverData.travelHours} bind:minutes={roverData.travelMinutes} />
                </div>

				<div class="flex flex-col">
					<Label>Services Offered</Label>
					<p class="text-red-500">{typeError}</p>
					<MultiSelect
						options={roverServices}
						bind:value={roverData.type}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>
			</div> 
        {:else if $page.data.user?.platform == 'upwork'}
            <div class="w-full max-w-md space-y-5">
				<div class="flex flex-col">
					<Label>Job Category</Label>
					<p class="text-red-500">{typeError}</p>
                    <MultiSelect
						options={upworkJobCategories}
						bind:value={upworkData.type}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>

				<div class="flex flex-col">
					<Label>Hourly Charge/ Fixed price</Label>
					<p class="text-red-500">{incomeError}</p>
                    <IconNumberInput bind:value={upworkData.hourlyCharge} className="mt-1" />
				</div>

				<div class="flex flex-col">
					<Label>Hours Worked</Label>
					<p class="text-red-500">{timeError}</p>
					<Duration bind:hours={upworkData.hoursPerWeek.hours} bind:minutes={upworkData.hoursPerWeek.minutes} />
				</div>

				<div class="flex flex-col">
					<Label>History of Working with Client</Label>
					<Input type="text" bind:value={upworkData.clientHistory} class="mt-1" />
				</div>

				<div class="flex flex-col">
					<Label>Experience Level</Label>
					<Select
						items={upworkExperience}
						bind:value={upworkData.experience}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>

				<div class="flex flex-col">
					<Label>Job Duration</Label>
					<Duration bind:hours={upworkData.jobDuration.hours} bind:minutes={upworkData.jobDuration.minutes} />
				</div>

				<!-- <div class="flex flex-col">
					<Label>Client Location</Label>
					<Input type="text" bind:value={upworkData.clientLocation} class="mt-1" />
				</div> -->
            </div>
		{/if}
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
                on:click={submitManual}
                disabled={!dataChanged}
                style="min-width: 120px;"
            >
                {docID ? 'Update' : 'Submit'}
            </button>
            {#if docID}
                <button
                    class="flex-1 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm md:text-base lg:text-base truncate"
                    on:click={() => goto('/protected/trends/personal')}
                    style="min-width: 120px;"
                >
                    See in Trends
                </button>
            {/if}
        </div>
    </div>
</div>
