<script lang="ts">
	import { collection, doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { db, storage } from '$lib/firebase/client';

	import { Button, Label, Select, Textarea } from 'flowbite-svelte';
	import BlueButton from '$lib/components/BlueButton.svelte';

	import { page } from '$app/stores';
	import Papa from 'papaparse';
	import { capitalize } from '$lib/utils';
	import { updateTitle } from '$lib/stores/title';
	import { onMount } from 'svelte';

	updateTitle(capitalize($page.data.user?.platform) + ' CSV Upload');

	let csv: File;
	let url: string;
	let timestamp = new Date();
	let note = '';
	let csvType = '';
	let successMessage = '';
	let errorMessage = '';
	let uploading = false;
	let fileId = 'trip_csv';
	$: fileName = csv ? csv.name : 'No file selected';
    // state management vars
    let prev_fileName = null;
    let manage = false;

	async function handleFileInputChange(event) {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			csv = fileInput.files[0];
		}
	}

	async function uploadCSVFile() {
		if (uploading || (!csv && !prev_fileName)) {
			errorMessage = !csv ? 'No file selected' : '';
			return;
		}
		// if only changing fields
		if (!csv && prev_fileName) {
			const collectionRef = collection(db, 'upload', 'csv', 'entries');
			const docRef = doc(collectionRef, id);

			await setDoc(docRef, {
				name: fileId,
				url: url,
				timestamp: timestamp,
				note: note,
				csvType: csvType
			}, { merge: true });
            manage = true;
			return;
		}

		errorMessage = '';
		uploading = true;

		try {
			const storageRef = ref(
				storage,
				`uploads/${$page.data.user.platform}/CSVs/${$page.data.user.uid}/${csv.name}`
			);
			await uploadBytes(storageRef, csv);
			url = await getDownloadURL(storageRef);

			await parseAndUploadCSV();
			successMessage = 'File uploaded successfully!';
		} catch (error) {
			console.error('Error uploading file:', error);
			errorMessage = 'Error uploading file.';
		} finally {
			uploading = false;
            manage = true;
		}
	}

	async function parseAndUploadCSV() {
		Papa.parse(csv, {
			header: true,
			complete: async (results) => {
				await uploadCSVDataToFirestore(results.data);
			},
			error: (error) => {
				console.error('Error parsing CSV file:', error);
			}
		});
	}

	async function uploadCSVDataToFirestore(data) {
		const user = $page.data.user;
		if (!user || !user.uid) {
			console.error('User is not logged in');
			return;
		}

		const collectionRef = collection(db, 'upload', 'csv', 'entries');
		const docRef = doc(collectionRef);

		await setDoc(docRef, {
			name: fileId,
			url: url,
			timestamp: timestamp,
			type: 'CSV',
			title: csv.name,
			uid: user.uid,
			note: note,
			csvType: csvType
		}, { merge: true });

		const batch = writeBatch(db);
		data.forEach((row, index) => {
			const subDocRef = doc(collection(docRef, 'trips'), `trip_${index}`);
			batch.set(subDocRef, { ...row, timestamp: timestamp, csvDownloadURL: url });
		});

		try {
			await batch.commit();
			console.log('CSV data successfully uploaded to Firestore.');
		} catch (error) {
			console.error('Error uploading CSV data to Firestore:', error);
		}
	}

	function handleClick() {
		document.getElementById('selectedFile')?.click();
	}

	let id = null;
	onMount(async () => {
		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		id = queryParams.get('id');

		if (id) {
			// Fetch document data based on 'id'
			const docRef = doc(db, 'upload', 'csv', 'entries', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				fileId = data.name;
				url = data.url;
				timestamp = data.timestamp;
				note = data.note;
				csvType = data.csvType;
				prev_fileName = data.title;
                fileName = data.title;
			}
		}
	});

	const csvOptions = [
	{ value: 'payments', name: 'Payments (driver_payments-x.csv)' },
	{ value: 'lifetime', name: 'Lifetime Trips (driver_lifetime_trips-x.csv)' },
	{ value: 'analytics', name: 'App Analytics (driver_app_analytics-x.csv)' }
];
</script>

<div class="text-center">
	<p class="mt-4">
		First, <a
			class="underline font-medium"
			href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbjBvWUJZQXhfSjhFZmlBclBXUzFOTHBhcmR6Z3xBQ3Jtc0ttaktGVzdlY0FVeEI1VWVxUXhnbFpWM1ZPYW94NHlISHNMZldvaWZpbmFuTzdQQnA3SDlNZ3V1dnp4QVFQRk1JckFDejhrLVFsMGxoTEZOUzBTYWVCbGlZMmFOWXlhbUVLSklIRUlnQ1A3b3Uya05wZw&q=https%3A%2F%2Fauth.uber.com%2Flogin%2F%3Fbreeze_local_zone%3Dphx5%26next_url%3Dhttps%253A%252F%252Fmyprivacy.uber.com%252Fprivacy%252Fexploreyourdata%252Fdownload%26state%3DqNUM7waq8Xg-ejonvGlPugg-6pw8IxvNFlx6TmDHzOo%253D&v=mKB5JECLguM"
			>download
		</a> and unzip your data from Uber.
	</p>

	<p class="mt-4">Next, browse and upload the CSV files one at a time.</p>

	<Label class="mt-4">Choose CSV File Type</Label>
	<Select
		items={csvOptions}
		bind:value={csvType}
		style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
		--sms-focus-border="2px solid blue"
	/>

	<div class="flex flex-col items-center">
		<div class="flex items-center space-x-4 pt-5 justify-center">
			<input
				id={fileId}
				type="button"
				value="Browse"
				on:click={handleClick}
				class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
			/>
			<p>{fileName}</p>
		</div>

		<div class="flex flex-col w-full">
			<Label class="w-full mb-1 text-left">Note</Label>
			<Textarea
				bind:value={note}
				rows="4"
				placeholder="Add a note about this CSV"
				class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
			/>
		</div>

		<input
			type="file"
			id="selectedFile"
			style="display: none;"
			accept=".csv"
			on:change={handleFileInputChange}
		/>

		{#if uploading}
			<Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
				<i class="fa-solid fa-spinner loadingSpinner animate-spin" />
			</Button>
		{:else}
			<div class="my-4">
				<BlueButton
					onclick={uploadCSVFile}
					buttonText={prev_fileName ? 'Update' : 'Upload File'}
				/>
			</div>
		{/if}
        {#if manage}
            <Button href="/protected/upload/manage" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Manage Files
            </Button>
        {/if}

		{#if successMessage}
			<p class="text-green-600 mt-2">{successMessage}</p>
		{/if}
		{#if errorMessage}
			<p class="text-red-600 mt-2">{errorMessage}</p>
		{/if}
	</div>

	<a
		class="flex items-center mt-4 text-black cursor-pointer"
		href="https://www.youtube.com/watch?v=mKB5JECLguM"
	>
		<i class="fas fa-play fa-2x mr-2"></i>
		<span>Learn more on how to add files from video</span>
	</a>
</div>
