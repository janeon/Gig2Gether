<script lang="ts">
    import {
        Table, TableBody, TableBodyCell, TableBodyRow,
        TableHead, TableHeadCell, Button, Tooltip
    } from 'flowbite-svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { updateTitle } from '$lib/stores/title';
    import { plan } from '$lib/stores/plan';

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

    const grossEarnings = parseFloat(platformData.summary.find(item => item.name === 'Gross earnings')?.amount.replace('$', '') || '0');
    const totalExpenses = parseFloat(platformData.summary.find(item => item.name === 'Total expenses')?.amount.replace('$', '') || '0');
    const netEarnings = calculateNetEarnings(grossEarnings, totalExpenses);

    platformData.summary.push({ name: 'Net Earnings', amount: `$${netEarnings.toFixed(2)}` });

    let data;
    $: data = $plan;
</script>
<!-- <p>Shared data: {data?.key}</p> -->

<div class="flex flex-col items-center p-4 w-full">
    <div class="w-full max-w-4xl flex flex-col space-y-4">
        <h1 class="text-lg font-bold text-red-600 mb-4 text-center">
            ALL NUMBERS BELOW ARE SIMULATED FOR STUDY & NOT REAL DATA
        </h1>

        <div class="flex flex-col space-y-4 w-full">
            <!-- Expenses Table -->
            <div class="w-full bg-white shadow-md rounded-lg">
                <Table>
                    <TableHead>
                        <TableHeadCell>Weekly Expenses</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        {#each platformData.expenses as { name, amount }}
                            <TableBodyRow>
                                <TableBodyCell>{name}</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell>{amount}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Total expenses</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>{platformData.summary.find(item => item.name === 'Total expenses')?.amount}</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>

            <!-- Stats Table -->
            <div class="w-full bg-white shadow-md rounded-lg">
                <Table>
                    <TableHead>
                        <TableHeadCell>Your Stats</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        {#each platformData.stats as { name, value }}
                            <TableBodyRow>
                                <TableBodyCell>{name}</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell>{value}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Gross earnings</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>{platformData.summary.find(item => item.name === 'Gross earnings')?.amount}</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>

            <!-- Earning Summary Table -->
            <div class="w-full bg-white shadow-md rounded-lg">
                <Table>
                    <TableHead>
                        <TableHeadCell>Earning Summary</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        {#each platformData.summary as { name, amount }}
                            <TableBodyRow>
                                <TableBodyCell>{name}</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell>{amount}</TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>

            <!-- Earnings per Hour -->
            {#if userPlatform === 'uber' || userPlatform === 'rover'}
                <div class="w-full bg-white shadow-md rounded-lg pb-4">
                    <div class="flex flex-col w-full">
                        <Table class="w-full">
                            <TableHead>
                                <TableHeadCell>How much do I make per hour?</TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                                <TableHeadCell>
                                    {#if userPlatform === 'uber'} $24.47/hr
                                    {:else} $24.47/hr
                                    {/if}
                                </TableHeadCell>
                            </TableHead>
                            <TableBody tableBodyClass="divide-y">
                                <TableBodyRow>
                                    <TableBodyCell class="text-red-600">Expenses</TableBodyCell>
                                    <TableBodyCell></TableBodyCell>
                                    <TableBodyCell class="text-red-600">-$10.23/hr</TableBodyCell>
                                </TableBodyRow>
                                <TableBodyRow>
                                    <TableBodyCell class="text-green-600">Net Earnings</TableBodyCell>
                                    <TableBodyCell></TableBodyCell>
                                    <TableBodyCell class="text-green-600">$14.24/hr</TableBodyCell>
                                </TableBodyRow>
                            </TableBody>
                        </Table>
                        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mt-4 text-center">
                            This hourly pay rate is calculated based on total gross earnings and expenses, and rounded to the nearest cent.
                        </p>
                    </div>
                </div>
            {/if}

            <!-- Navigation Buttons -->
			<div class="w-full flex justify-between mt-4">
                <Button on:click={() => navigatePage('work-day')} color="dark">Previous</Button>
				<Button 
				class="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed" 
				disabled>
				Content</Button>
				<Tooltip 
					type="custom" 
					defaultClass="" 
					class="p-4 text-sm font-medium bg-blue-500 text-gray-100" 
					arrow={false}>
					The content displayed is an example of results layout. It does not contain real user data.
				</Tooltip>
                <Button on:click={() => navigatePage('work-results')} color="blue">Continue</Button>
            </div>
        </div>
    </div>
</div>
