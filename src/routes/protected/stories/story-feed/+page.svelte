<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { Button, Dropdown, Accordion, AccordionItem } from 'flowbite-svelte';
	export let data;
	import { updateTitle } from '$lib/stores/title';
	updateTitle('Story Feed');
	import { createFilterStore, filterHandler } from '$lib/stores/filter.js';
	import { onDestroy, onMount } from 'svelte';
	let dataToDisplay = data.posts;

	const filterStore = createFilterStore(dataToDisplay);

	const unsubscribe = filterStore.subscribe((model) => filterHandler(model));

	$: platform_all = true;
	$: type_all = true;

	$: roverCheck = true;
	$: uberCheck = true;
	$: upworkCheck = true;

	$: issueCheck = true;
	$: strategyCheck = true;

	let mobile: boolean;
	onMount(() => {
		mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			window.navigator.userAgent
		);
	});

	onDestroy(() => {
		unsubscribe();
	});

	function onClick(group: string, box: string) {
    const allCheck = group === 'platform' ? 'platform_all' : 'type_all';
    const filterName = group === 'platform' ? 'platform_filter' : 'type_filter';
    const checkMap = {
        'platform': { all: ['rover', 'uber', 'upwork'], states: [roverCheck, uberCheck, upworkCheck] },
        'type': { all: ['issue', 'strategy'], states: [issueCheck, strategyCheck] },
    };

    const updateFilterState = (name: string, isChecked: boolean) => {
        $filterStore[filterName] = isChecked
            ? [...$filterStore[filterName], name]
            : $filterStore[filterName].filter(item => item !== name);
    };

    const updateAllStates = (isChecked: boolean) => {
        checkMap[group].states.forEach((_, i) => checkMap[group].states[i] = isChecked);
        $filterStore[filterName] = isChecked ? checkMap[group].all : [];
    };

    if (box === 'all') {
        this[allCheck] = !this[allCheck];
        updateAllStates(this[allCheck]);
    } else {
        const idx = checkMap[group].all.indexOf(box);
        checkMap[group].states[idx] = !checkMap[group].states[idx];
        updateFilterState(box, checkMap[group].states[idx]);
        this[allCheck] = checkMap[group].states.every(Boolean);
    }
}

</script>

<div class="flex flex-col items-center">
	{#if mobile}
		<div class="flex flex-col items-center">
			<!-- Sticky filters for mobile -->
			<div class="flex flex-row space-x-2 sticky top-0 z-10 bg-white">
				<Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
					<input
						type="checkbox"
						id="all platforms"
						bind:checked={platform_all}
						on:click={() => {
							onClick('platform', 'all');
						}}
					/>
					<span>Platforms</span>
				</Button>
				<Dropdown class="p-3">
					<li>
						<input
							id="rover"
							type="checkbox"
							bind:checked={roverCheck}
							on:click={() => {
								onClick('platform', 'rover');
							}}
						/>
						<span>Rover</span>
					</li>
					<li>
						<input
							id="uber"
							type="checkbox"
							bind:checked={uberCheck}
							on:click={() => {
								onClick('platform', 'uber');
							}}
						/>
						<span>Uber</span>
					</li>
					<li>
						<input
							id="upwork"
							type="checkbox"
							bind:checked={upworkCheck}
							on:click={() => {
								onClick('platform', 'upwork');
							}}
						/>
						<span>Upwork</span>
					</li>
				</Dropdown>
				<Button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
					<input
						type="checkbox"
						id="all types "
						bind:checked={type_all}
						on:click={() => {
							onClick('type', 'all');
						}}
					/>
					<span>Types</span>
				</Button>
				<Dropdown class="p-3">
					<li>
						<input
							id="issue"
							type="checkbox"
							bind:checked={issueCheck}
							on:click={() => {
								onClick('type', 'issue');
							}}
						/>
						<span>Issue</span>
					</li>
					<li>
						<input
							id="strategy"
							type="checkbox"
							bind:checked={strategyCheck}
							on:click={() => {
								onClick('type', 'strategy');
							}}
						/>
						<span>Strategy</span>
					</li>
				</Dropdown>
			</div>
			<div class="w-full justify-items-center mt-16">
				{#if $filterStore.filtered.length > 0}
					{#each $filterStore.filtered as post}
						<PostCard postData={post} />
					{/each}
				{:else}
					<p class="text-center">There are no posts yet!</p>
				{/if}
			</div>
		</div>
	{:else}
		<div class="flex flex-row max-w-lg">
			<div class="w-full justify-items-center">
				{#if $filterStore.filtered.length > 0}
					{#each $filterStore.filtered as post}
						<PostCard postData={post} />
					{/each}
				{:else}
					<p class="text-center">There are no posts yet!</p>
				{/if}
			</div>
			<!-- filters for desktop -->
			<div class="justify-end space-y-2 sticky top-0 z-10 bg-white">
				<Accordion>
					<AccordionItem>
						<span slot="header" class="text-base flex gap-2">
							<input
								type="checkbox"
								id="all platforms"
								bind:checked={platform_all}
								on:click={() => {
									onClick('platform', 'all');
								}}
							/>
							<span>Platforms</span>
						</span>
						<div id="platform">
							<div>
								<input
									id="rover"
									type="checkbox"
									bind:checked={roverCheck}
									on:click={() => {
										onClick('platform', 'rover');
									}}
								/>
								<span>Rover</span>
							</div>
							<div>
								<input
									id="uber"
									type="checkbox"
									bind:checked={uberCheck}
									on:click={() => {
										onClick('platform', 'uber');
									}}
								/>
								<span>Uber</span>
							</div>
							<div>
								<input
									id="upwork"
									type="checkbox"
									bind:checked={upworkCheck}
									on:click={() => {
										onClick('platform', 'upwork');
									}}
								/>
								<span>Upwork</span>
							</div>
						</div>
					</AccordionItem>
					<AccordionItem>
						<span slot="header" class="text-base flex gap-2">
							<input
								type="checkbox"
								id="all types"
								bind:checked={type_all}
								on:click={() => {
									onClick('type', 'all');
								}}
							/>
							<span>Types</span>
						</span>
						<div id="type">
							<div>
								<input
									id="issue"
									type="checkbox"
									bind:checked={issueCheck}
									on:click={() => {
										onClick('type', 'issue');
									}}
								/>
								<span>Issue</span>
							</div>
							<div>
								<input
									id="strategy"
									type="checkbox"
									bind:checked={strategyCheck}
									on:click={() => {
										onClick('type', 'strategy');
									}}
								/>
								<span>Strategy</span>
							</div>
						</div>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	{/if}
</div>
