<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import { goto } from '$app/navigation';
	import { updateTitle } from '$lib/stores/title';
	import ScheduleSelector from 'react-schedule-selector';
	import { Button } from 'flowbite-svelte';
	import { plan } from '$lib/stores/plan';


	let next = false;
	const handleClick = () => (next ? navigateWithStore() : (next = true));

	next
		? updateTitle('What time would you like to work?')
		: updateTitle('What days are you planning for?');

	function calculateDaysBetween([start, end]: [string, string]): number {
		const startDate = new Date(start).getTime();
		const endDate = new Date(end).getTime();
		return (endDate - startDate) / (1000 * 3600 * 24) + 1;
	}

	let selectedDates = ['', ''];

	let schedule = [];
	const handleChange = (newSchedule) => {
		schedule = newSchedule;
	};

	function navigateWithStore() {
		plan.set({ key: schedule });
		goto('./work-breakdown');
	}

	// Get today's date
	const today = new Date();
</script>

<div class="flex flex-row">
	<div class="flex flex-col items-center-3/4 p-2 w-full">
		{#if next}
			<div class="w-90">
				<react:ScheduleSelector
					selection={schedule}
					selectionScheme="square"
					minTime={6}
					maxTime={24}
					hourlyChunks={1}
					startDate={selectedDates[0]}
					numDays={calculateDaysBetween(selectedDates)}
					onChange={handleChange}
				/>
			</div>
		{:else}
			<div class="flex flex-col items-center">
				<p class="text-gray-500 mb-1">Select a Range of Dates (Beginning + End)</p>
			</div>
			<div class="flex justify-center mb-6">
				<SveltyPicker
					isRange={true}
					pickerOnly={true}
					startDate={today}
					bind:value={selectedDates}
				/>
			</div>
			<div class="flex flex-col items-center">
				<p class="text-gray-500 mb-1">It's ok if you don't want to work some days in between</p>
				<p class="text-gray-500 mb-1">You will make the selection in the next step</p>
			</div>
		{/if}

		{#if next}
			<div class="w-full flex justify-between mt-4">
				<Button on:click={() => (next = false)} color="dark">Previous</Button>
				<Button on:click={handleClick} color="blue">Continue</Button>
			</div>
		{:else}
			<div class="flex justify-center mt-4">
				<button class="bg-black text-white py-2 px-4 rounded" on:click={handleClick}>
					Continue
				</button>
			</div>
		{/if}
	</div>
</div>
