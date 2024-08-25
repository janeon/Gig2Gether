<script lang="ts">
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";

    export let platformData: any = {};
    export let userPlatform;
    export let tableData;
    export let tableTitle;
    export let summaryKey;
</script>

<div class="flex flex-col space-y-4 w-full">
    <!-- Planner Table -->
    <div class="w-full bg-white shadow-md rounded-lg">
        <Table>
            <TableHead>
                <TableHeadCell>{tableTitle}</TableHeadCell>
                <TableHeadCell></TableHeadCell>
                <TableHeadCell></TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each tableData as { name, value }}
                    <TableBodyRow>
                        <!-- Apply break-words class to the leftmost column -->
                        <TableBodyCell class="whitespace-normal break-words" style="min-width: 10px !important;">{name}</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>{value}</TableBodyCell>
                    </TableBodyRow>
                {/each}
                {#if summaryKey}
                    <TableBodyRow>
                        <TableBodyCell class="font-bold whitespace-normal break-words" style="min-width: 10px !important;">{summaryKey}</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>{platformData.summary.find(item => item.name === summaryKey)?.amount}</TableBodyCell>
                    </TableBodyRow>
                {/if}
            </TableBody>
        </Table>
    </div>

    <!-- Earnings per Hour -->
    {#if (userPlatform === 'uber' || userPlatform === 'rover') && (tableTitle === 'Your Stats')}
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
</div>
