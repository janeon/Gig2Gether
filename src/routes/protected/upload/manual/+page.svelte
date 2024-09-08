<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { _getInitialData, _cleanData } from './+page';
	import { updateTitle } from '$lib/stores/title';
	import { capitalize, handleBrowseClick, handleKeyDown, handleRatingsKeyDown } from '$lib/utils';
	import { upworkExperience, roverServices } from '$lib/constants';

	import { db, storage } from '$lib/firebase/client';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

	import MultiSelect from 'svelte-multiselect';
	import {
		Label,
		Input,
		Select,
		Textarea,
		Accordion,
		AccordionItem,
		Button,
		NumberInput
	} from 'flowbite-svelte';
	import IconNumberInput from '$lib/components/IconNumberInput.svelte';

	import job_categories from '$lib/job_categories.json';
	const platform = $page.data.user?.platform;
	updateTitle(capitalize(platform) + ' Manual Upload');

	let [successMessage, errorMessage, timeError, typeError, incomeError, dateError] = [
		'',
		'Please enter:',
		'',
		'',
		'',
		''
	];

	let file: File;
	let imageUrlPreview: string = null;
	$: fileName = file ? file.name : 'Upload a Photo';
	let url: string;
	let cut;

	let roverData: any;
	let upworkData: any;

	onMount(async () => {
		// Fetch user profile data
		const profile = await getDoc(doc(db, 'users', $page.data.user.uid, 'settings', 'profile'));
		if (profile.exists()) {
			const data = profile.data();
			cut = data.platformCut;
		}

		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		const id = queryParams.get('id');

		if (id) {
			// Fetch document data based on 'id'
			docID = id;
			const docRef = doc(db, 'upload', 'manual', $page.data.user?.platform, docID);
			getDoc(docRef).then((doc) => {
				if (doc.exists()) {
					for (const [key, value] of Object.entries(doc.data())) {
						if (value !== null && value !== undefined) {
							if ($page.data.user?.platform == 'rover') {
								roverData[key] = value;
							} else {
								upworkData[key] = value;
							}
							if (key === 'url') {
								imageUrlPreview = value;
							}
						}
					}
				}
			});
		}
	});

	if (!roverData || !upworkData) {
		// Initialize data
		const loadedData = _getInitialData($page.data.user?.uid, cut);
		roverData = loadedData.roverData;
		upworkData = loadedData.upworkData;
	}

	const upworkJobCategories = Object.keys(job_categories);

	// Document tracking stuff
	let docID: string | null = null;
	let initialData = $page.data.user?.platform == 'rover' ? { ...roverData } : { ...upworkData };
	// Track if data has changed
	$: dataChanged =
		JSON.stringify($page.data.user?.platform == 'rover' ? roverData : upworkData) !==
		JSON.stringify(initialData);

	async function handleFileChange(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		imageUrlPreview = URL.createObjectURL(fileInput.files[0]);
		if (fileInput.files && fileInput.files.length > 0) {
			file = fileInput.files[0];
			fileName = file.name;
		}
	}

	function clearFile() {
		fileName = 'Upload a Photo';
		imageUrlPreview = '';

		const fileInput = document.getElementById('selectedFile') as HTMLInputElement;
		fileInput.value = ''; // Clear the file input
		if (platform === 'rover') {
			roverData.url = '';
		} else {
			upworkData.url = '';
		}
	}

	function calculateRoverIncome() {
		// if we know # units and rate but not income, calculate income
		if (roverData.rate && roverData.unitsWorked && !roverData.income) {
			roverData.income = roverData.rate * roverData.unitsWorked;
			// if we know income and platform cut but not cut income, calculate cut income
			if (!roverData.cutIncome) {
				if (roverData.platformCutType === 'percent') {
					roverData.cutIncome = (roverData.income * (100 - roverData.platformCut)) / 100;
				} else {
					roverData.cutIncome = roverData.income - roverData.platformCut;
				}
			}
			// if we know cut income and platform cut but not income, calculate income
		} else if (!roverData.income && roverData.cutIncome) {
			if (roverData.platformCutType === 'percent') {
				roverData.income = (roverData.cutIncome / (100 - roverData.platformCut)) * 100;
			} else {
				roverData.income = roverData.cutIncome + roverData.platformCut;
			}
			// if we know income but not cut income, calculate income before platform cut
		} else if (roverData.income && !roverData.cutIncome) {
			roverData.cutIncome = (roverData.income * (100 - roverData.platformCut)) / 100;
		} else if (roverData.income && roverData.cutIncome) {
			if (roverData.platformCutType === 'percent') {
				roverData.platformCut = ((roverData.income - roverData.cutIncome) / roverData.income) * 100;
			} else {
				roverData.platformCut = roverData.income - roverData.cutIncome;
			}
		}
	}

	function calculateUpworkIncome() {
		if (upworkData.hourlyCharge && upworkData.unitsWorked && !upworkData.cutIncome) {
			// if we know # units and rate and platform cut but not cut income, calculate cut income
			if (upworkData.platformCutType === 'percent') {
				upworkData.cutIncome =
					(upworkData.hourlyCharge * upworkData.unitsWorked * (100 - upworkData.platformCut)) / 100;
				// console.log(typeof upworkData.hourlyCharge, typeof upworkData.unitsWorked);
			} else {
				upworkData.cutIncome = upworkData.rate * upworkData.unitsWorked - upworkData.platformCut;
			}
		}
		// if we know fixed charge but not cut income, calculate income before platform cut
		else if (upworkData.fixedCharge && !upworkData.cutIncome) {
			if (upworkData.platformCutType === 'percent') {
				upworkData.cutIncome = (upworkData.fixedCharge * (100 - upworkData.platformCut)) / 100;
			} else {
				upworkData.cutIncome = upworkData.fixedCharge - upworkData.platformCut;
			}
		} else if (upworkData.fixedCharge && upworkData.cutIncome) {
			if (upworkData.platformCutType === 'percent') {
				upworkData.platformCut =
					((upworkData.fixedCharge - upworkData.cutIncome) / upworkData.fixedCharge) * 100;
			} else {
				upworkData.platformCut = upworkData.fixedCharge - upworkData.cutIncome;
			}
		} else if (upworkData.cutIncome && !upworkData.fixedCharge) {
			if (upworkData.platformCutType === 'percent')
				upworkData.fixedCharge = (upworkData.cutIncome / (100 - upworkData.platformCut)) * 100;
			else upworkData.fixedCharge = upworkData.cutIncome + upworkData.platformCut;
		}
	}

	async function submitManual() {
		// Reset error messages
		errorMessage = 'Please enter:';
		timeError = incomeError = typeError = dateError = '';

		if (platform === 'rover') {
			calculateRoverIncome();
			if (
				!roverData.income &&
				!roverData.cutIncome &&
				!(roverData.rate && (roverData.unitsWorked || (roverData.startTime && roverData.endTime)))
			) {
				incomeError = 'Please Enter Income';
				errorMessage += ' Income,';
			}
			if (!roverData.date) {
				dateError = 'Please Enter Date';
				errorMessage += ' Date,';
			}
			if (!roverData.type || !roverData.type.length) {
				typeError = 'Please Enter Service Offered';
				errorMessage += ' Service Offered,';
			}
			if (!roverData.unitsWorked && roverData.startTime === roverData.endTime) {
				timeError = `Or (Estimated) ${roverData.workUnits} worked`;
				errorMessage += ` Worked Time${roverData.workUnits !== 'Hour' ? '/' + roverData.workUnits : ''}`;
			}
			if (dateError || incomeError || typeError || timeError) {
				return;
			}
		} else if (platform === 'upwork') {
			calculateUpworkIncome();
			if (!upworkData.date || !upworkData.endDate) {
				dateError = 'Please Enter Start/End Date';
				errorMessage += ' Date,';
			}
			// console.log(upworkData)
			if (!upworkData.type || !upworkData.type.length) {
				typeError = 'Please Enter Job Category';
				errorMessage += ' Job Category,';
			}
			if (!upworkData.hourlyCharge && !upworkData.fixedCharge) {
				incomeError = 'Please Enter Income';
				errorMessage += ' Income,';
			}
			// console.log(!upworkData.hoursPerWeek.hours && !upworkData.hoursPerWeek.minutes )
			// console.log(upworkData.startTime, upworkData.endTime)
			// console.log(!upworkData.startTime && !upworkData.endTime)
			// console.log(!upworkData.unitsWorked)
			if (
				!upworkData.hoursPerWeek.hours &&
				!upworkData.hoursPerWeek.minutes &&
				upworkData.startTime === upworkData.endTime &&
				!(upworkData.unitsWorked && (upworkData.workUnits === 'Hours' || 'Minutes'))
			) {
				timeError = 'Or Add (Estimated) Hours Worked';
				errorMessage += ' Time Worked,';
			}
			if (dateError || incomeError || typeError || timeError) {
				return;
			}
		}

		if (file) {
			const storageRef = ref(
				storage,
				`uploads/${$page.data.user.platform}/income/${$page.data.user.uid}/${file.name}`
			);
			const result = await uploadBytes(storageRef, file);
			url = await getDownloadURL(result.ref);
			if (platform === 'rover') {
				roverData.url = url;
			} else {
				upworkData.url = url;
			}
		}

		const collectionRef = collection(db, 'upload', 'manual', platform);

		// clean up upload data
		if (platform === 'rover') {
			roverData = _cleanData(upworkData, roverData, platform, initialData).roverData;
		} else {
			upworkData = _cleanData(upworkData, roverData, platform, initialData).upworkData;
		}

		const docRef = docID ? doc(collectionRef, docID) : doc(collectionRef);

		const updateDataObject = (platform: string) => {
			const dataToUpdate = platform === 'rover' ? roverData : upworkData;
			// console.log("got data object", dataToUpdate)
			if (dataToUpdate) {
				setDoc(docRef, dataToUpdate, { merge: true });
				// console.log("set data")
				successMessage = docID ? 'Update Successful!' : 'Submission Successful!';
				docID = docRef.id;
				// Update initial data after successful submission
				// console.log("about to reset initials data")
				initialData = { ...dataToUpdate };
				// console.log("reset done")
			}
		};
		updateDataObject($page.data.user?.platform);
		// console.log("got through it all")
	}
</script>

<div class="flex flex-row">
	<div class="py-2 flex flex-col items-center w-full">
		{#if $page.data.user?.platform == 'rover'}
			<div class="w-full max-w-md space-y-5">
				<div class="flex flex-col -mb-4">
					<Label>Start Date<span class="text-red-500">* {dateError}</span></Label>
					<Input type="date" bind:value={roverData.date} class="mb-4 min-h-5" />
					<Label
						>Start Time <span class="text-red-500">
							{#if timeError}
								Please specify start/end times
							{/if}
						</span></Label
					>
					<Input type="time" bind:value={roverData.startTime} class="mb-4" />

					<Label>End Date</Label>
					<Input type="date" bind:value={roverData.endDate} class="mb-4" />

					<Label>End Time</Label>
					<Input type="time" bind:value={roverData.endTime} />
				</div>

				<Accordion flush class="">
					<AccordionItem class="max-h-0 overflow-hidden" open>
						<span slot="header">Income<span class="text-red-500">* {incomeError}</span></span>
						<div class="flex flex-col pb-3 bg-gray-100 rounded-lg">
							<Label>Income (after platform cut)</Label>
							<IconNumberInput bind:value={roverData.cutIncome} className="mt-1" />
							<hr class="border-t border-gray-300 my-4" />
							<div class="flex items-center justify-between">
								<Label>Rate of Charge</Label>
								<Label>Unit of Work</Label>
							</div>
							<div class="flex items-center mt-1">
								<div class="w-1/2 mr-2">
									<IconNumberInput bind:value={roverData.rate} className="mr-2" />
								</div>
								Per
								<div class="w-1/2 ml-2">
									<Input type="text" bind:value={roverData.workUnits} />
								</div>
							</div>
							<div class="mt-3">
								<Label
									># of {roverData.workUnits} Worked
									<span class="text-red-500">{timeError}</span></Label
								>
								<NumberInput
									type="number"
									bind:value={roverData.unitsWorked}
									on:keydown={handleKeyDown}
								/>
							</div>
							<hr class="border-t border-gray-300 my-4" />
							<Label>Income before Platform Cut (client paid)</Label>
							<IconNumberInput bind:value={roverData.income} className="mr-2" />
							<div class="flex items-center justify-between mt-1">
								<Label>Platform Cut</Label>
								<Label>Cut Units</Label>
							</div>
							<div class="flex items-center">
								<div class="w-3/4 mr-2">
									<Input
										type="number"
										bind:value={roverData.platformCut}
										className="mt-1"
										on:keydown={handleKeyDown}
									/>
								</div>
								<div class="w-1/4 mr-2">
									<Select
										items={[
											{ value: 'percent', name: '%' },
											{ value: 'dollar', name: '$' }
										]}
										bind:value={roverData.platformCutType}
										style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
										--sms-focus-border="2px solid blue"
									/>
								</div>
							</div>
							<button
								class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2"
								on:click={calculateRoverIncome}
							>
								Calculate
							</button>
						</div>
					</AccordionItem>
				</Accordion>

				<div class="flex flex-col">
					<Label>Tips</Label>
					<IconNumberInput bind:value={roverData.tips} />

					<Label class="mt-4">Travel to gig</Label>
					<div class="flex items-center mt-1 mb-4">
						<div class="w-1/2 mr-2">
							<Input
								type="number"
								placeholder="Minutes"
								bind:value={roverData.travelMinutes}
								class="mr-2"
								on:keydown={handleKeyDown}
							/>
						</div>
						or
						<div class="w-1/2 ml-2">
							<Input
								type="number"
								placeholder="Miles"
								bind:value={roverData.travelMiles}
								class="mr-2"
								on:keydown={handleKeyDown}
							/>
						</div>
					</div>

					<Label>Service Offered<span class="text-red-500">*{typeError}</span></Label>
					<MultiSelect
						options={roverServices}
						bind:value={roverData.type}
						maxSelect={1}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>

					<Label class="mt-4">Notes</Label>
					<Textarea type="text" bind:value={roverData.notes} class="mt-1" />
				</div>
			</div>
		{:else if $page.data.user?.platform == 'upwork'}
			<div class="w-full max-w-md space-y-5 mt-3">
				<div class="flex flex-col">
					<Label>Start Date <span class="text-red-500">*{dateError}</span></Label>
					<Input type="date" bind:value={upworkData.date} class="mb-4 min-h-5" />

					<Label
						>Start Time <span class="text-red-500">
							{#if timeError}
								Please specify start/end times
							{/if}
						</span></Label
					>
					<Input type="time" bind:value={upworkData.startTime} class="mb-4" />

					<Label>End Date<span class="text-red-500">* {dateError}</span></Label>
					<Input type="date" bind:value={upworkData.endDate} class="mb-4" />

					<Label>End Time</Label>
					<Input type="time" bind:value={upworkData.endTime} class="mb-4" />

					<Label>Job Category<span class="text-red-500">*{typeError}</span></Label>
					<MultiSelect
						options={upworkJobCategories}
						maxSelect={1}
						bind:value={upworkData.type}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
					<Accordion flush class="">
						<AccordionItem class="max-h-0 overflow-hidden" open>
							<span slot="header">Income<span class="text-red-500">*{incomeError}</span></span>
							<div class="flex flex-col pb-3 bg-gray-100 rounded-lg">
								<div class="flex items-center justify-between mt-1">
									<Label>Rate of Charge</Label>
									<Label>Unit of Work</Label>
								</div>
								<div class="flex items-center mt-1">
									<div class="w-1/2 mr-2">
										<IconNumberInput bind:value={upworkData.hourlyCharge} className="mr-2" />
									</div>
									<div class="w-1/2 ml-2">
										<Input type="text" bind:value={upworkData.workUnits} />
									</div>
								</div>
								<Label
									># of {upworkData.workUnits} Worked
									{#if timeError}
										<span class="text-red-500"
											>Or Enter (Estimated) {upworkData.workUnits} worked</span
										>
									{/if}
								</Label>

								<NumberInput
									type="number"
									bind:value={upworkData.unitsWorked}
									on:keydown={handleKeyDown}
								/>
								<span class="flex flex-col items-center mt-2">Or</span>
								<Label>Fixed price</Label>
								<IconNumberInput bind:value={upworkData.fixedCharge} className="mt-1" />

								<hr class="border-t border-gray-300 my-4" />
								<Label>Income after Platform Cut</Label>
								<IconNumberInput bind:value={upworkData.cutIncome} className="mr-2" />
								<div class="flex items-center justify-between mt-1">
									<Label>Platform Cut</Label>
									<Label>Cut Units</Label>
								</div>
								<div class="flex items-center">
									<div class="w-3/4 mr-2">
										<Input
											type="number"
											bind:value={upworkData.platformCut}
											className="mt-1"
											on:keydown={handleKeyDown}
										/>
									</div>
									<div class="w-1/4 mr-2">
										<Select
											items={[
												{ value: 'percent', name: '%' },
												{ value: 'dollar', name: '$' }
											]}
											bind:value={upworkData.platformCutType}
											style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
											--sms-focus-border="2px solid blue"
										/>
									</div>
								</div>
								<button
									class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-2"
									on:click={calculateUpworkIncome}
								>
									Calculate
								</button>
							</div>
						</AccordionItem>
					</Accordion>

					{#if upworkData.workUnits !== 'Hours'}
						<Label
							>(Estimated) Time Worked
							{#if timeError}
								<span class="text-red-500 py-2">Or Time Worked</span>
							{/if}
						</Label>
						<Input
							type="number"
							bind:value={upworkData.hoursPerWeek}
							on:keydown={handleRatingsKeyDown}
						/>
					{/if}

					<Label class="mt-4">Any Past History Working with Client?</Label>
					<Input type="text" bind:value={upworkData.clientHistory} class="mt-1" />

					<Label class="mt-4">Experience Level</Label>
					<Select
						items={upworkExperience}
						bind:value={upworkData.experience}
						style="--sms-bg: rgb(249, 250, 251); padding: 8px; border-radius: 8px;"
						--sms-focus-border="2px solid blue"
					/>
				</div>

				<div class="flex flex-col">
					<Label>Notes</Label>
					<Textarea type="text" bind:value={upworkData.notes} class="mt-1" />
				</div>
			</div>
		{/if}
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
					on:click={submitManual}
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
							New Income
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
