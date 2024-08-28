<script lang="ts">
	import type { Data } from '$lib/types';

	import BlueButton from '$lib/components/BlueButton.svelte';
	import DataRow from '$lib/components/DataRow.svelte';
	import { Input, Select } from 'flowbite-svelte';

	import { updateTitle } from '$lib/stores/title.js';
	import { _load } from './+page.js';
	import type { User } from '../../../app.js';
	import Label from '$lib/components/ui/label/label.svelte';

	updateTitle('Manage Data');

	let platforms = [
		{ value: 'uber', name: 'Uber' },
		{ value: 'rover', name: 'Rover' },
		{ value: 'upwork', name: 'Upwork' }
	];

	let posts: any[] = [];
	let visits: any[] = [];
	let likes: any[] = [];

	let toDelete: Data[] = [];

	let user: User = {
		uid: '',
		role: '',
		credentials: '',
		username: '',
		platform: ''
	};

	let uid;
	let platform;
	async function setUser() {
		// user.uid = "spp8He2nTlQvsshggYloBoeHsIf1"
		user.uid = uid;
		user.platform = platform;
		const loaded = await _load(user);
		posts = loaded.posts;
		visits = loaded.visits;
		likes = loaded.likedPosts;
	}
</script>

<div class="py-2 max-w-[40vh] mx-auto">
	<Label>UID</Label>
	<Input class="" bind:value={uid}></Input>

	<Label class="mt-4">Platform</Label>
	<Select items={platforms} bind:value={platform} />
	<BlueButton onclick={setUser} buttonText="Search User" />
</div>

<h1 class="flex justify-center font-bold">Upload Entries</h1>
{#if posts.length > 0}
	{#each posts as post}
		<DataRow bind:checkBind={toDelete} docInfo={post} />
	{/each}
{/if}

<h1 class="flex justify-center font-bold">Visits to Trends Page</h1>
{#if visits.length > 0}
	<div class="flex flex-row border-2 items-center">
		{#each visits as visit}
			<div class="px-2 border-r-2">
				{visit.timestamp}
			</div>
		{/each}
	</div>
{/if}

<h1 class="flex justify-center font-bold">Liked Posts</h1>

{#if likes.length > 0}
	<div class="justify-items-center py-2">
		{#each likes as likedPost}
			<div class="flex flex-row border-2 items-center">
				<div class="px-2 border-r-2">
					{likedPost.id}
				</div>
				<div class="px-2 border-r-2">
					{likedPost.title}
				</div>
				<div class="px-2 border-r-2">
					{likedPost.content}
				</div>
			</div>
		{/each}
	</div>
{/if}
