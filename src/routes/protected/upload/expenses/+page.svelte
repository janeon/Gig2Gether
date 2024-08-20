<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { db, storage } from '$lib/firebase/client';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

	import MultiSelect from 'svelte-multiselect';
	import { Label, Input, Textarea, Button, Tooltip } from 'flowbite-svelte';
	import IconNumberInput from '$lib/components/IconNumberInput.svelte';

	import { currentTime, handleBrowseClick } from '$lib/utils';
	import { updateTitle } from '$lib/stores/title';
	import { capitalize, extractAfterEquals } from '$lib/utils';
	import { onMount } from 'svelte';

	updateTitle(capitalize($page.data.user?.platform) + ' Expenses');

	let successMessage = '';
	let errorMessage = 'Please enter:';
	let amountError = '';
	let dateError = '';

	let data = {
		date: null,
		time: currentTime,
		expenseType: [],
		description: '',
		amount: null,
		uid: $page.data.user.uid,
		timestamp: new Date(),
		url: null
	};

	let file: File;
	let imageUrlPreview: string;
	$: fileName = file ? file.name : 'Upload a Photo (e.g., Receipts)';
	let url: string | null = null;
	let docID: string | null = null;
	const basePath = '/protected/trends/personal';

	onMount(() => {
		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get('id');

		if (id) {
			docID = id;
			const docRef = doc(db, 'upload', 'expenses', $page.data.user?.platform, docID);
			getDoc(docRef).then((doc) => {
				if (doc.exists()) {
					for (const [key, value] of Object.entries(doc.data())) {
						if (value !== null && value !== undefined) {
							data[key] = value;
							if (key === 'url') {
								imageUrlPreview = value;
							}
						}
					}
				}
			});
		}
	});

	let initialData = { ...data };

	// Track if data has changed
	$: dataChanged = JSON.stringify(data) !== JSON.stringify(initialData);

	const dollar = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
    </svg>`;

	// Define expense types for different platforms
	const uberExpenseType = ['Car Wash/ Cleaning', 'Gas', 'Car Rental', 'Other'];
	const roverExpenseType = ['Pet Supplies', 'Transportation', 'Other'];
	const upworkExpenseType = ['Software', 'Office Supplies', 'Insurance', 'Other'];

	async function handleFileChange(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		imageUrlPreview = URL.createObjectURL(fileInput.files[0]);
		if (fileInput.files && fileInput.files.length > 0) {
			file = fileInput.files[0];
			fileName = file.name;
		}
	}

	function clearFile() {
		fileName = 'Upload a Photo (e.g., Receipts)';
		imageUrlPreview = '';

		const fileInput = document.getElementById('selectedFile') as HTMLInputElement;
		fileInput.value = ''; // Clear the file input
		data.url = '';
	}

	async function submitExpenses() {
		errorMessage = 'Please enter:';
		dateError = amountError = '';
		if (!data.amount || !data.date) {
			if (!data.amount) {
				amountError = 'Please Enter Amount';
				errorMessage += ' Amount,';
			}
			if (!data.date) {
				dateError = 'Please Enter Date';
				errorMessage += ' Date';
			}
			return;
		}

		if (file) {
			const storageRef = ref(
				storage,
				`uploads/${$page.data.user.platform}/expenses/${$page.data.user.uid}/${file.name}`
			);
			const result = await uploadBytes(storageRef, file);
			url = await getDownloadURL(result.ref);
			data.url = url;
		}

		errorMessage = 'Please enter:';
		const collectionRef = collection(db, 'upload', 'expenses', $page.data.user.platform);
		const docRef = docID ? doc(collectionRef, docID) : doc(collectionRef);
		data.amount = extractAfterEquals(data.amount);

		await setDoc(docRef, data, { merge: true });
		successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
		docID = docRef.id;
		// Update initial data after successful submission
		initialData = { ...data };
	}

	const platformTooltips = {
		uber: 'Potential Tax-deductible expenditures can be found in Expenses, Fees, and Tax section on the Tax Information Tab of the Uber Driver Dashboard.',
		upwork:
			'Tax-deductible expenses can relate to your home office, utilities, phone and internet, office supplies, business travel, advertising, insurance, software, and other business-related costs to maximize tax deductions.',
		rover:
			'Rover expenses include fees, refunds from cancellations, pet supplies costs, legal or accounting fees, public transportation, vehicle-related expenses (mileage, maintenance, gas), and any costs associated with running business from home to claim deductions for tax purposes.'
	};

	let userPlatform = $page.data.user?.platform;
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
		<div class="w-full max-w-md space-y-5">
			<div class="flex flex-col">
				<Label>Expense Date<span class="text-red-500">*{dateError}</span></Label>
				<Input type="date" bind:value={data.date} class="mt-1" />
			</div>

			<div class="flex flex-col">
				<Label>Expense Timestamp (time of transaction)</Label>
				<Input type="time" bind:value={data.time} class="mt-1" />
			</div>

			{#if $page.data.user?.platform == 'uber'}
				<div class="flex flex-col">
					<Label>Expense Type</Label>
					<MultiSelect
						options={uberExpenseType}
						bind:value={data.expenseType}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>
			{:else if $page.data.user?.platform == 'rover'}
				<div class="flex flex-col">
					<Label>Expense Type</Label>
					<MultiSelect
						options={roverExpenseType}
						bind:value={data.expenseType}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>
			{:else if $page.data.user?.platform == 'upwork'}
				<div class="flex flex-col">
					<Label>Expense Type</Label>
					<MultiSelect
						options={upworkExpenseType}
						bind:value={data.expenseType}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>
			{/if}

			<div class="flex flex-col">
				<Label>Description</Label>
				<Textarea
					bind:value={data.description}
					rows="4"
					placeholder="Briefly describe what the expense was used for"
					class="mt-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
				/>
			</div>

			<div class="flex flex-col">
				<Label>Amount</Label>
				<IconNumberInput bind:value={data.amount} icon={dollar} className="mt-1" />
			</div>
		</div>

		<div class="flex flex-col">
			<!-- https://stackoverflow.com/questions/1084925/input-type-file-show-only-button -->
			<div
				class="flex {fileName === 'Upload a Photo (e.g., Receipts)'
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
				on:change={handleFileChange}
			/>

			<div class="flex items-center justify-center">
				<img src={imageUrlPreview} class="rounded-sm mt-2 object-contain w-1/2" alt="" />
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
					on:click={submitExpenses}
					style="border-radius: 4px; min-width: 120px; flex-grow: 1;"
				>
					{docID ? 'Update' : 'Submit'}
				</Button>

				{#if docID}
					<Button
						class="flex-1 py-2 text-sm md:text-base lg:text-base truncate"
						color="blue"
						on:click={() => goto(`${basePath}?expense=${true}`)}
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
							New Expense
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

		<!-- Reminder tooltips for Uber, Upwork, and Rover users -->
		{#if userPlatform && platformTooltips[userPlatform]}
			<Button class="text-white bg-blue-400 mt-4">What's an expense?</Button>
			<Tooltip
				type="custom"
				defaultClass=""
				class="p-4 text-sm font-medium bg-blue-500 text-gray-100 max-w-xs"
				arrow={false}
			>
				{platformTooltips[userPlatform]}
			</Tooltip>
		{/if}
	</div>
</div>
