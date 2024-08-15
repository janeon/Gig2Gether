<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { db, storage } from "$lib/firebase/client";
    import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
	import { collection, doc, setDoc } from 'firebase/firestore';

	import { currentDate, currentTime, extractAfterEquals, capitalize, handleBrowseClick } from '$lib/utils';
	import { updateTitle } from '$lib/stores/title';
	
	import { Label, Input, Textarea } from 'flowbite-svelte';
	import IconNumberInput from '$lib/components/IconNumberInput.svelte';

	updateTitle(capitalize($page.data.user?.platform) + ' Trip Upload');

	let successMessage = '';
	let errorMessage = '';

	let fareError = '';

	// Uber Expenses
	let tripData = {
		date: currentDate,
		time: currentTime,
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
		uid: $page.data.user?.uid
	};

	let docID: string | null = null;
	// Store the initial data for comparison
	let initialData = { ...tripData };

	// Track if data has changed
	$: dataChanged = JSON.stringify(tripData) !== JSON.stringify(initialData);

	let file: File
    let imageUrlPreview : string
    $: fileName = file ? file.name : 'Upload a Photo';
    let url : string

    async function handleFileChange (event: Event) {
      const fileInput = event.target as HTMLInputElement;
      imageUrlPreview = URL.createObjectURL(fileInput.files[0])
      if (fileInput.files && fileInput.files.length > 0) {
        file = fileInput.files[0];
        fileName = file.name;
      }
    }

	async function submitManualTrip() {
		if (!tripData.fare) {
			fareError = 'Please Enter a Fare';
			return;
		}
		fareError = '';

		// Process properties if no errors
		const properties = ['fare', 'surge', 'waitTimeBonus', 'tips', 'boost', 'withholdings'];
		properties.forEach((property) => {
			if (tripData[property] !== null) {
				tripData[property] = extractAfterEquals(tripData[property]);
			}
		});

		if (file) {
            const storageRef = ref(storage, 
			`uploads/${$page.data.user.platform}/trips/${$page.data.user.uid}/${file.name}`);
            const result = await uploadBytes(storageRef, file);
            url = await getDownloadURL(result.ref);
        }

		const collectionRef = collection(db, 'upload', 'manual', 'uber');
		const docRef = doc(collectionRef); 
		await setDoc(docRef, tripData, { merge: true });
        successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
		docID = docRef.id;
		// Update initial data after successful submission
		initialData = { ...tripData };
		
	}
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
		<div class="w-full max-w-md space-y-5">
			<div class="flex flex-col">
				<Label>Date</Label>
				<Input type="date" bind:value={tripData.date} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Start Time</Label> 
                <Input type="time" bind:value={tripData.time} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Fare</Label>
				<p class="text-red-500">{fareError}</p>
				<IconNumberInput bind:value={tripData.fare} className="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>End Time</Label> 
				<Input type="time" bind:value={tripData.endTime} class="mt-1" />
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
                <Textarea bind:value={tripData.note} rows="4" placeholder="To remember this trip by"
                class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"/>
            </div>

			<div class="flex flex-col">
				<!-- https://stackoverflow.com/questions/1084925/input-type-file-show-only-button -->
				<div class="flex {(fileName === 'Upload a Photo') ? 'flex-row' : 'flex-col'} items-center space-x-4 pt-5 justify-center">
					<input 
					type="button" 
					value="Browse" 
					on:click={handleBrowseClick} 
					class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700" 
					/>
					<p class="text-center">{fileName}</p>
				
				
				<input 
					type="file" 
					id="selectedFile" 
					style="display: none;" 
					accept="video/*,image/*" 
					on:change={handleFileChange} 
				/>
			</div>
				<div class = "flex items-center justify-center">
					<img src={imageUrlPreview} class="rounded-sm mt-2 object-contain w-1/2 " alt="" />
				</div>
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
					on:click={submitManualTrip}
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
		{#if docID}
        <form method="POST" class="flex flex-row items-center ">
            <button
            class="flex-1 my-2 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm md:text-base lg:text-base truncate"
            style="min-width: 120px;"
            type="submit"
            >
            New Trip
            </button>
        </form>
        {/if}
		</div>
	</div>
</div>
