<script lang="ts">
	import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
	import { db, storage } from '$lib/firebase/client';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	import { Button, Input, ButtonGroup, Textarea } from 'flowbite-svelte';
	import { ToggleGroupItem, ToggleGroup } from '$lib/components/ui/toggle-group';
	import BlueButton from '$lib/components/BlueButton.svelte';
	import Tags from '$lib/components/tags.svelte';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { updateTitle } from '$lib/stores/title';
	import { goto } from '$app/navigation';
	import { handleBrowseClick } from '$lib/utils';
	updateTitle('Share Story');

	let tags: string[] = [];
	let file: File;
	let title: string = '';
	let description: string = '';
	let url: string;
	let type: string;
	let uploading = false;
	let id: string;

	let imageUrlPreview: string;
	$: fileName = file ? file.name : 'Share a Photo/Video';
	$: [
		postSharing,
		sharePrivate,
		errorMessageContent,
		errorMessageType,
		errorMessageTags,
		errorMessageSharing,
		errorMessage
	] = [[], false, '', '', '', '', ''];

	const commonTags = [
		{ value: 'fair pay', label: 'Fair Pay' },
		{ value: 'discrimination', label: 'Discrimination' },
		{ value: 'ratings', label: 'Ratings' },
		{ value: 'work time', label: 'Working Time' },
		{ value: 'stress', label: 'Stress (e.g. from precarity)' },
		{ value: 'deactivation', label: 'Deactivation' },
		{ value: 'technology', label: 'Technology' },
		{ value: 'other', label: 'Other' }
	];

	const uberTags = [
		{ value: 'safety', label: 'Safety' },
		{ value: 'care-giving', label: 'Care-giving' },
		{ value: 'algorithms', label: 'Understanding Algorithms' },
		...commonTags
	];

	const roverTags = [
		{ value: 'safety', label: 'Safety' },
		{ value: 'care-giving', label: 'Care-giving' },
		{ value: 'algorithms', label: 'Understanding Algorithms' },
		...commonTags
	];

	const upworkTags = [
		{ value: 'scams', label: 'Scams' },
		{ value: 'getting started', label: 'Getting Started' },
		{ value: 'algorithms', label: 'Algorithm Functionality' },
		{ value: 'customers', label: 'Customers' },
		...commonTags
	];

	const sharingOptions = [
		{ value: 'private', label: 'Private' },
		{ value: 'workers', label: 'Workers' },
		{ value: 'policymakers', label: 'Policymakers' },
		{ value: 'advocates', label: 'Advocates' }
	];

	async function handleFileChange(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		imageUrlPreview = URL.createObjectURL(fileInput.files[0]);
		if (fileInput.files && fileInput.files.length > 0) {
			file = fileInput.files[0];
			fileName = file.name;
		}
	}

	async function uploadContent() {
		if (uploading) return;

		// Error checking
		errorMessageType = type ? '' : 'Please select a story type';
		errorMessageTags = tags.length ? '' : 'Please select at least one tag';
		errorMessageSharing = postSharing.length ? '' : 'Please choose a sharing preference';
		errorMessageContent =
			file || title.length || description.length ? '' : 'Please add content to share';

		if (errorMessageType || errorMessageTags || errorMessageSharing || errorMessageContent) {
			errorMessage = 'Please fill out required fields'
		}

		// Ensure only 'private' is selected if included
		if (postSharing.includes('private')) postSharing = ['private'];

		uploading = true;

		try {
			if (file) {
				const storageRef = ref(storage, `stories/strategy/${$page.data.user.uid}/${file.name}`);
				const result = await uploadBytes(storageRef, file);
				url = await getDownloadURL(result.ref);
			}

			const postData = {
				type,
				title,
				description,
				uid: $page.data.user.uid,
				url: url || null,
				date: new Date(),
				tags,
				platform: $page.data.user.platform,
				likes: [],
				sharing: postSharing,
				username: $page.data.user.username
			};
			if (!id) {
				await addDoc(collection(db, 'stories', $page.data.user.platform, 'posts'), postData);
			} else {
				await setDoc(doc(db, 'stories', $page.data.user.platform, 'posts', id), postData);
			}
				// await addDoc(collection(db, 'stories', $page.data.user.platform, 'posts'), postData);
			goto('/protected/stories/story-feed');
		} catch {
			uploading = false;
		}
	}

	function changeSharingPreferencesSingle() {
		postSharing = [];
		sharePrivate = false;
	}

	function changeSharingPreferencesMultiple(value: String[]) {
		if (value.includes('private')) {
			sharePrivate = true;
		}
		if (postSharing.includes(value)) {
			postSharing = postSharing.filter((item) => item !== value);
		} else {
			postSharing = [...postSharing, value];
		}
	}

	onMount(async () => {
		let collectionRef = collection(db, 'users', $page.data.user.uid, 'settings');
		let docRef = doc(collectionRef, 'sharing');
		let docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			postSharing = docSnap.data().sharing;
		}
		if (postSharing.includes('private')) {
			sharePrivate = true;
		}

		// Extract search parameter 'id'
		const queryParams = new URLSearchParams(window.location.search);
		id = queryParams.get('id');

		if (id) {
			// Fetch document data based on 'id'
			const docRef = doc(db, 'stories', $page.data.user.platform, 'posts', id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				type = data.type;
				title = data.title;
				description = data.description;
				tags = data.tags || [];
				postSharing = data.sharing || [];
				imageUrlPreview = data.url || '';
			}
		}
	});
</script>

<!-- Issue/Strategy Selection -->

<div class="flex py-2">
	<div class="flex items-center space-x-2">
		<h1 class="font-medium whitespace-nowrap">Select a Story Type <span class="text-red-500">*</span>:</h1>
		<ButtonGroup>
			{#each ['issue', 'strategy'] as option}
				<Button
					on:click={() => (type = option)}
					class={`flex-1 ${type === option ? 'bg-blue-500 text-white font-bold' : 'bg-gray-200 text-gray-600 font-normal'} ${type === option ? 'focus:outline-none' : ''} hover:bg-transparent hover:text-current`}
				>
					{option.charAt(0).toUpperCase() + option.slice(1)}
				</Button>
			{/each}
		</ButtonGroup>
		<p class="text-red-500 font-medium">{errorMessageType}</p>
	</div>
</div>

<!-- Tag selection -->
<h1 class="font-medium whitespace-nowrap py-5">
	Tag related topics!
	<span class="text-red-500 font-medium">*{errorMessageTags}</span>
</h1>
{#if $page.data.user.platform == 'rover'}
	<Tags tags={roverTags} bind:bindGroup={tags} />
{:else if $page.data.user.platform == 'uber'}
	<Tags tags={uberTags} bind:bindGroup={tags} />
{:else if $page.data.user.platform == 'upwork'}
	<Tags tags={upworkTags} bind:bindGroup={tags} />
{/if}

<div class="py-5">
	Title: <span class="text-red-500 font-medium">*{errorMessageContent}</span>
	<Input placeholder="Short summary" bind:value={title} />

	<div class="mt-4">
		Description:
		<Textarea
			id="description"
			placeholder="Elaborate on your story here"
			bind:value={description}
			class="resize-none"
			style="
  background-color: rgb(249, 250, 251); /* Light background */
  border: 1px solid rgb(209, 213, 219); /* Gray border */
  border-radius: 0.375rem; /* Rounded corners */
  padding: 0.5rem; /* Padding inside textarea */
  color: rgb(31, 41, 55); /* Text color */
"
		/>
	</div>

	<!-- https://stackoverflow.com/questions/1084925/input-type-file-show-only-button -->
	<div class="flex items-center space-x-4 pt-5 justify-center">
		<input
			type="button"
			value="Browse"
			on:click={handleBrowseClick}
			class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
		/>
		<p class="text-center">{fileName}</p>
	</div>

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

<div class="py-5">
	<h2 class="font-medium mb-5 flex justify-center">
		Who to Share With? <p class="text-red-500 font-medium">*</p>
	</h2>
	{#if errorMessageSharing.length}
		<div class="flex justify-center">
			<span class="text-red-500 font-medium">{errorMessageSharing}</span>
		</div>
	{/if}

	{#if sharePrivate}
		<div class="space-y-2">
			<div class="flex justify-center">
				<ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
					<ToggleGroupItem value="private" data-state="on" class="font-bold"
						>Private</ToggleGroupItem
					>
				</ToggleGroup>
			</div>

			<div class="flex justify-center space-x-2">
				<ToggleGroup type="single" onValueChange={changeSharingPreferencesSingle}>
					<ToggleGroupItem value="workers" disabled>Workers</ToggleGroupItem>
					<ToggleGroupItem value="policymakers" disabled>Policymakers</ToggleGroupItem>
					<ToggleGroupItem value="advocates" disabled>Advocates</ToggleGroupItem>
				</ToggleGroup>
			</div>
		</div>
	{:else}
		<div class="space-y-2">
			<div class="flex justify-center">
				<ToggleGroup
					type="multiple"
					variant="outline"
					bind:value={postSharing}
					onValueChange={changeSharingPreferencesMultiple}
				>
					<ToggleGroupItem
						value={sharingOptions[0].value}
						class={postSharing.includes(sharingOptions[0].value) ? 'font-bold' : ''}
					>
						{sharingOptions[0].label}
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<div class="flex justify-center space-x-2">
				<ToggleGroup
					type="multiple"
					variant="outline"
					bind:value={postSharing}
					onValueChange={changeSharingPreferencesMultiple}
				>
					{#each sharingOptions.slice(1) as { value, label }}
						<ToggleGroupItem {value} class={postSharing.includes(value) ? 'font-bold' : ''}>
							{label}
						</ToggleGroupItem>
					{/each}
				</ToggleGroup>
			</div>
		</div>
	{/if}
</div>

<div class="flex flex-col items-center py-5 space-y-4">
	{#if errorMessage.length}
		<div class="text-red-500 font-medium text-center">
			<p>{errorMessage}</p>
		</div>
	{/if}
	<div>
		{#if uploading}
			<Button
				class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
				on:click={uploadContent}
			>
				<i class="fa-solid fa-spinner loadingSpinner animate-spin" />
			</Button>
		{:else}
			<BlueButton onclick={uploadContent} buttonText={id ? "Update" : "Upload Content"}></BlueButton>
		{/if}
	</div>
</div>
