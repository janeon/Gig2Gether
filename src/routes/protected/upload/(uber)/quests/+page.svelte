<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { db, storage } from '$lib/firebase/client';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

	import { Label, Input, NumberInput, Textarea, Button } from 'flowbite-svelte';
	import IconNumberInput from '$lib/components/IconNumberInput.svelte';
	import Duration from '$lib/components/Duration.svelte';

	import {
		currentTime,
		extractAfterEquals,
		capitalize,
		handleBrowseClick,
		handleFileChange
	} from '$lib/utils';
	import { updateTitle } from '$lib/stores/title';
	import { onMount } from 'svelte';
	updateTitle(capitalize($page.data.user?.platform) + ' Quests');

	let successMessage = '';
	let errorMessage = 'Please enter:';
	let rewardError = '';
	let baseError = '';
	let dateError = '';

	let docID: string | null = null;

	let questData = {
		timestamp: new Date(),
		type: 'quest',
		date: null,
		end_date: null,
		startTime: currentTime,
        note: '',
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

	onMount(() => {
		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get('id');

		if (id) {
			docID = id;
			const docRef = doc(db, 'upload', 'manual', 'quests', docID);
			getDoc(docRef).then((doc) => {
				if (doc.exists()) {
					for (const [key, value] of Object.entries(doc.data())) {
						if (value !== null && value !== undefined) {
							questData[key] = value;
						}
					}
				}
			});
		}
	});

	let initialData = { ...questData };

	$: dataChanged = JSON.stringify(questData) !== JSON.stringify(initialData);

	let file: File;
	let imageUrlPreview: string;
	$: fileName = file ? file.name : 'Upload a Photo';
	let url: string;

	async function onFileChange(event: Event) {
		file = await handleFileChange(event);
		if (file) {
			imageUrlPreview = URL.createObjectURL(file);
		}
	}

	function clearFile() {
		fileName = 'Upload a Photo';
		imageUrlPreview = '';

		const fileInput = document.getElementById('selectedFile') as HTMLInputElement;
		fileInput.value = ''; // Clear the file input
	}

	async function submitManualQuest() {
		errorMessage = 'Please enter:';

		baseError = rewardError = dateError = '';
		if (!questData.baseTrips || !questData.rewardForTrips || !questData.date) {
			if (!questData.baseTrips) {
				baseError = 'Please Enter Base # of Trips';
				errorMessage += ' Base # Trips,';
			}
			if (!questData.rewardForTrips) {
				rewardError = 'Please Enter Base Reward';
				errorMessage += ' Base Reward,';
			}
			if (!questData.date) {
				dateError = 'Please Enter Start Date';
				errorMessage += ' Date';
			}
			return;
		}

		['rewardForTrips', 'rewardForBonusTrips', 'earnings', 'tips'].forEach((property) => {
			if (questData[property] !== null) {
				questData[property] = extractAfterEquals(questData[property]);
			}
		});

		if (file) {
			const storageRef = ref(
				storage,
				`uploads/${$page.data.user.platform}/quests/${$page.data.user.uid}/${file.name}`
			);
			const result = await uploadBytes(storageRef, file);
			url = await getDownloadURL(result.ref);
		}

		const collectionRef = collection(db, 'upload', 'manual', 'quests');
		const docRef = docID ? doc(collectionRef, docID) : doc(collectionRef);
		successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
		await setDoc(docRef, questData, { merge: true });
		docID = docRef.id;
		// Update initial data after successful submission
		initialData = { ...questData };
	}
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
		<div class="w-full max-w-md space-y-5">
			<div class="flex flex-col">
				<Label>Start Date<span class="text-red-500">*{dateError}</span></Label>
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
				<Label>Base # Trips<span class="text-red-500">*{baseError}</span></Label>
				<NumberInput bind:value={questData.baseTrips} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Reward for Base # of Trips<span class="text-red-500">*{rewardError}</span></Label>
				<IconNumberInput bind:value={questData.rewardForTrips} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Reward for Bonus Trips</Label>
				<IconNumberInput bind:value={questData.rewardForBonusTrips} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Time Since Beginning of Quest</Label>
				<Duration
					bind:hours={questData.hoursSince.hours}
					bind:minutes={questData.hoursSince.minutes}
					className="mt-1"
				/>
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

            <div class="flex flex-col">
            <Label class="mt-4">Notes</Label>
            <Textarea type="text" bind:value={questData.note} class="mt-1" />
            </div>

			<div class="flex flex-col">
				<!-- https://stackoverflow.com/questions/1084925/input-type-file-show-only-button -->
				<div
					class="flex {fileName === 'Upload a Photo'
						? 'flex-row'
						: 'flex-col'} items-center space-x-4 pt-5 justify-center"
				>
					<input
						type="button"
						value="Browse"
						on:click={handleBrowseClick}
						class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
					/>
					<p class="text-center">{fileName}</p>
				</div>

				{#if imageUrlPreview}
					<div class="flex justify-center mt-4">
						<button
							on:click={clearFile}
							class="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
						>
							Clear
						</button>
					</div>
				{/if}

				<input
					type="file"
					id="selectedFile"
					style="display: none;"
					accept="video/*,image/*"
					on:change={onFileChange}
				/>

				<div class="flex items-center justify-center">
					<img src={imageUrlPreview} class="rounded-sm mt-2 object-contain w-1/2" alt="" />
				</div>
			</div>
		</div>

		<div class="flex justify-center mt-2">
			{#if successMessage}
				<p class="text-green-600 mt-2">{successMessage}</p>
			{/if}
			{#if errorMessage !== 'Please enter:'}
				<p class="text-red-600 mt-2">{errorMessage}</p>
			{/if}
		</div>

		<div class="flex flex-col gap-4 mt-6">
			<div class="flex flex-row items-center gap-4">
				<Button
					class="flex-1 py-2 text-sm md:text-base lg:text-lg truncate"
					color={dataChanged ? 'dark' : 'light'}
					disabled={!dataChanged}
					on:click={submitManualQuest}
					style="border-radius: 4px; min-width: 120px; flex-grow: 1;"
				>
					{docID ? 'Update' : 'Submit'}
				</Button>

				{#if docID}
					<Button
						class="flex-1 py-2 text-sm md:text-base lg:text-base truncate"
						color="blue"
						on:click={() => goto('/protected/trends/personal')}
						style="border-radius: 4px; min-width: 120px; flex-grow: 1;"
					>
						See in Trends
					</Button>
				{/if}
			</div>

			{#if docID}
				<div class="flex flex-row items-center gap-4">
					<form method="POST" action="?/reload">
						<Button
							class="flex-1 py-3 text-sm md:text-base lg:text-base"
							color="blue"
							style="border-radius: 4px; min-width: 120px; flex-grow: 1;"
							type="submit"
						>
							New Quest
						</Button>
					</form>
					<form method="POST" action="?/manage">
						
					<Button
						class="flex-1 py-3 text-sm md:text-base lg:text-base"
						color="dark"
						style="border-radius: 4px; min-width: 120px; flex-grow: 1;"
						type="submit"
						>
						Manage
					</Button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
