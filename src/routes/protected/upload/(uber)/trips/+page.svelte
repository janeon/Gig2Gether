<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { db, storage } from '$lib/firebase/client';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

	import { currentTime, extractAfterEquals, capitalize, handleBrowseClick } from '$lib/utils';
	import { updateTitle } from '$lib/stores/title';

	import { Label, Input, Textarea, Button } from 'flowbite-svelte';
	import IconNumberInput from '$lib/components/IconNumberInput.svelte';
	import { onMount } from 'svelte';
	import Duration from '$lib/components/Duration.svelte';

	updateTitle(capitalize($page.data.user?.platform) + ' Trip Upload');

	let successMessage = '';
	let errorMessage = 'Please enter:';
	let fareError = '';
	let dateError = '';

	let file: File;
	let imageUrlPreview: string;
	$: fileName = file ? file.name : 'Upload a Photo';
	let url: string;

	// Uber Expenses
	let tripData = {
		timestamp: new Date(),
		date: null,
		time: currentTime,
		durationHours: null,
		durationMinutes: null,
		endTime: currentTime,
		type: 'trip',
		hours: null,
		minutes: null,
		fare: null,
		surge: null,
		tips: null,
		waitTimeBonus: null,
		boost: null,
		withholdings: null,
		note: '',
		url: '',
		uid: $page.data.user?.uid
	};

	onMount(() => {
		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get('id');

		if (id) {
			docID = id;
			const docRef = doc(db, 'upload', 'manual', 'trips', docID);
			getDoc(docRef).then((doc) => {
				if (doc.exists()) {
					for (const [key, value] of Object.entries(doc.data())) {
						if (value !== null && value !== undefined) {
							tripData[key] = value;
							if (key === 'url') {
								imageUrlPreview = value;
							}
						}
					}
				}
			});
		}
	});

	let docID: string | null = null;
	// Store the initial data for comparison
	let initialData = { ...tripData };

	// Track if data has changed
	$: dataChanged = JSON.stringify(tripData) !== JSON.stringify(initialData);

	function onFileChange(event) {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			file = fileInput.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				imageUrlPreview = e.target.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function clearFile() {
		fileName = 'Upload a Photo';
		imageUrlPreview = '';

		const fileInput = document.getElementById('selectedFile') as HTMLInputElement;
		fileInput.value = ''; // Clear the file input
		tripData.url = '';
	}

	function addTime(startTime, addHours, addMinutes) {
		// Split the input time (HH:mm) into hours and minutes
		let [hours, minutes] = startTime.split(':').map(Number);

		// Add the input hours and minutes
		hours += addHours;
		minutes += addMinutes;

		// Handle minute overflow
		if (minutes >= 60) {
			hours += Math.floor(minutes / 60);
			minutes = minutes % 60;
		}

		// Handle hour overflow, handle date changes later
		hours = (hours >= 24)? hours % 24 : hours ;

		// Format hours and minutes to always be 2 digits (HH:mm)
		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');

		return `${formattedHours}:${formattedMinutes}`;
	}

	function handleDurationChange() {
		tripData.endTime = addTime(tripData.time, tripData.durationHours, tripData.durationMinutes)
	}

	async function submitManualTrip() {
		errorMessage = 'Please enter:';
		fareError = dateError = '';
		if (!tripData.fare || !tripData.date) {
			if (!tripData.fare) {
				fareError = 'Please Enter Fare';
				errorMessage += ' Fare,';
			}
			if (!tripData.date) {
				dateError = 'Please Enter Trip Date';
				errorMessage += ' Date';
			}
			return;
		}

		// Process properties if no errors
		const properties = ['fare', 'surge', 'waitTimeBonus', 'tips', 'boost', 'withholdings'];
		properties.forEach((property) => {
			if (tripData[property] !== null) {
				tripData[property] = extractAfterEquals(tripData[property]);
			}
		});

		if (file) {
			const storageRef = ref(
				storage,
				`uploads/${$page.data.user.platform}/trips/${$page.data.user.uid}/${file.name}`
			);
			const result = await uploadBytes(storageRef, file);
			url = await getDownloadURL(result.ref);
			tripData.url = url;
		}

		const collectionRef = collection(db, 'upload', 'manual', 'trips');
		const docRef = docID ? doc(collectionRef, docID) : doc(collectionRef);
		await setDoc(docRef, tripData, { merge: true });
		successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
		docID = docRef.id;
		// Update initial data after successful submission
		initialData = { ...tripData };
	}
	$: handleDurationChange(); 
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
		<div class="w-full max-w-md space-y-5">
			<div class="flex flex-col">
				<Label>Date<span class="text-red-500">*{dateError}</span></Label>
				<Input type="date" bind:value={tripData.date} class="mt-1" required />
			</div>

			<div class="flex flex-col">
				<Label>Start Time</Label>
				<Input type="time" bind:value={tripData.time} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Trip Duration</Label>
				<Duration
					bind:hours={tripData.durationHours}
					bind:minutes={tripData.durationMinutes}
					className="mt-1"
					on:change={handleDurationChange}
				/>
			</div>

			<div class="flex flex-col">
				<Label>End Time</Label>
				<Input type="time" bind:value={tripData.endTime} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Fare<span class="text-red-500">*{fareError}</span></Label>
				<IconNumberInput bind:value={tripData.fare} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Surge</Label>
				<IconNumberInput bind:value={tripData.surge} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Tip</Label>
				<IconNumberInput bind:value={tripData.tips} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Wait Time Bonus</Label>
				<IconNumberInput bind:value={tripData.waitTimeBonus} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Promotion/Boost</Label>
				<IconNumberInput bind:value={tripData.boost} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Uber Fees/Withholdings</Label>
				<IconNumberInput bind:value={tripData.withholdings} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Note</Label>
				<Textarea
					bind:value={tripData.note}
					rows="4"
					placeholder="To remember this trip by"
					class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
				/>
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
					color={dataChanged ? 'blue' : 'light'}
					disabled={!dataChanged}
					on:click={submitManualTrip}
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
							New Trip
						</Button>
					</form>
					<form method="POST" action="?/manage">
						<Button
							class="flex-1 py-3 text-sm md:text-base lg:text-base"
							color="blue"
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
