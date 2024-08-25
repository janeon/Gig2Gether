<script lang="ts">
	import { Button, Tooltip } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { updateTitle } from '$lib/stores/title';
	import { plan } from '$lib/stores/plan';
	import PlannerTable from '$lib/components/PlannerTable.svelte';

	updateTitle('Breakdown of Costs and Earnings');

	function calculateNetEarnings(grossEarnings: number, totalExpenses: number): number {
		return grossEarnings - totalExpenses;
	}

	async function navigatePage(direction: string) {
		plan.set({ key: data.key });
		goto(`./${direction}`);
	}

	const platforms = {
		uber: {
			expenses: [
				{ name: 'Fuel', amount: '$64.56' },
				{ name: 'Maintenance', amount: '$42.93' },
				{ name: 'Insurance', amount: '$32.58' },
				{ name: 'License and registration', amount: '$11.96' },
				{ name: 'Weekly car/ rental payment', amount: '$57.53' },
				{ name: 'Depreciation', amount: '$25.12' },
				{ name: 'Fica tax', amount: '$74.87' },
				{ name: 'Healthcare', amount: '$0.00' },
				{ name: 'Other Expense', amount: '$100.00' }
			],
			stats: [
				{ name: 'Number of hours', value: '40' },
				{ name: 'Trips', value: '90' },
				{ name: 'Total Miles', value: '403.5' },
				{ name: 'Avg. trip minutes', value: '14.60' },
				{ name: 'Avg. trip miles', value: '4.50' },
				{ name: 'Total fares', value: '$904.32' },
				{ name: 'Total tips', value: '$74.44' }
			],
			summary: [
				{ name: 'Gross earnings', amount: '$978.76' },
				{ name: 'Total expenses', amount: '$409.35' }
			]
		},
		rover: {
			expenses: [
				{ name: 'Miscellaneous', amount: '$64.56' },
				{ name: 'Transportation', amount: '$32.58' },
				{ name: 'Damage', amount: '$100' },
				{ name: 'Maintenance', amount: '$100' }
			],
			stats: [
				{ name: 'Number of services', value: '4-8' },
				{ name: 'Total hours', value: '25' },
				{ name: 'Avg. time per service', value: '3.5 hours' },
				{ name: 'Avg. fee per service', value: '$25.00' },
				{ name: 'Total fees', value: '$100.00' },
				{ name: 'Total tips', value: '$40.00' }
			],
			summary: [
				{ name: 'Gross earnings', amount: '$140.00' },
				{ name: 'Total expenses', amount: '$409.35' }
			]
		},
		upwork: {
			expenses: [
				{ name: 'Software', amount: '$50.00' },
				{ name: 'Internet', amount: '$30.00' },
				{ name: 'Hardware', amount: '$200.00' },
				{ name: 'Utilities', amount: '$20.00' },
				{ name: 'Other Expenses', amount: '$10.00' }
			],
			stats: [
				{ name: 'Number of projects', value: '7' },
				{ name: 'Total hours', value: '35' },
				{ name: 'Avg. hours per project', value: '5.0' },
				{ name: 'Total earnings', value: '$700.00' },
				{ name: 'Other Earnings', value: '$50.00' }
			],
			summary: [
				{ name: 'Gross earnings', amount: '$750.00' },
				{ name: 'Total expenses', amount: '$310.00' }
			]
		}
	};

	const userPlatform = $page.data.user?.platform || 'uber';
	let platformData = platforms[userPlatform];

	const grossEarnings = parseFloat(
		platformData.summary.find((item) => item.name === 'Gross earnings')?.amount.replace('$', '') ||
			'0'
	);
	const totalExpenses = parseFloat(
		platformData.summary.find((item) => item.name === 'Total expenses')?.amount.replace('$', '') ||
			'0'
	);
	const netEarnings = calculateNetEarnings(grossEarnings, totalExpenses);

	platformData.summary.push({ name: 'Net Earnings', amount: `$${netEarnings.toFixed(2)}` });

	let data;
	$: data = $plan;
</script>

<div class="flex flex-col items-center p-4 w-full">
	<div class="w-full max-w-4xl flex flex-col space-y-4">
		<h1 class="text-lg font-bold text-red-600 mb-4 text-center">
			ALL NUMBERS BELOW ARE SIMULATED FOR STUDY & NOT REAL DATA
		</h1>

		<div class="flex flex-col space-y-4">
			<!-- Stats Table -->
			<PlannerTable
				tableTitle="Your Stats"
				tableData={platformData.stats.map((stat) => ({ name: stat.name, value: stat.value }))}
				summaryKey="Gross earnings"
				{platformData}
				{userPlatform}
			/>

			<!-- Expenses Table -->
			<PlannerTable
				tableTitle="Weekly Expenses"
				tableData={platformData.expenses.map((expense) => ({
					name: expense.name,
					value: expense.amount
				}))}
				summaryKey="Total expenses"
				{platformData}
				{userPlatform}
			/>

			<!-- Earning Summary Table -->
			<PlannerTable
				tableTitle="Earning Summary"
				tableData={platformData.summary.map((summary) => ({
					name: summary.name,
					value: summary.amount
				}))}
				summaryKey=""
				{userPlatform}
			/>

			<!-- Navigation Buttons -->
			<div class="w-full flex justify-between mt-4">
				<Button on:click={() => navigatePage('work-day')} color="dark">Previous</Button>
				<Button
					class="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed"
					disabled
				>
					Content</Button
				>
				<Tooltip
					type="custom"
					defaultClass=""
					class="p-4 text-sm font-medium bg-blue-500 text-gray-100 max-w-xs"
					arrow={false}
				>
					The content displayed is an example of results layout. It does not contain real user data.
				</Tooltip>
				<Button on:click={() => navigatePage('work-results')} color="blue">Continue</Button>
			</div>
		</div>
	</div>
</div>
