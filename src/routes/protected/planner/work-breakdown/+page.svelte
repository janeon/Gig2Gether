<script lang="ts">
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip, Button } from 'flowbite-svelte';
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    async function nextPage() {
        goto('./work-results');
    }
    async function previousPage() {
        goto('./work-details');
    }
</script>

<div class="flex flex-row">
    <div class="w-1/4 p-2">
        <PlannerSidebar />
    </div>

    {#if $page.data.user?.platform == "uber"}
    <div class="w-3/4 flex flex-col items-start p-2">
        <h1 class="text-lg font-medium mb-1">Breakdowns</h1>
        <div class="flex flex-row space-x-4 w-full">
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Weekly Expenses</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Fuel</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$64.56</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Maintenance</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$42.93</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Insurance</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$32.58</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>License and registration</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$11.96</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Weekly car/ rental payment</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$57.53</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Depreciation</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$25.12</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Fica tax</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$74.87</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Healthcare</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$0.00</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Other Expenese</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$100.00</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Total expenses</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$409.35</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Your Stats</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Number of hours</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>40</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Trips</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>90</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total Miles</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>403.5</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Avg. trip minutes</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>14.60</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Avg. trip miles</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>4.50</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total fares</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$904.32</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total tips</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$74.44</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Gross earnings</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$978.76</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        <div class="w-full mt-4">
            <Table>
                <TableHead>
                    <TableHeadCell>Earning Summary</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                    <TableBodyRow>
                        <TableBodyCell>Gross earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$978.76</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="font-bold">Total earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$409.35</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="font-bold">Net Earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$569.41</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
    </div>
    {:else if $page.data.user?.platform == "rover"}
    <div class="w-3/4 flex flex-col items-start p-2">
        <h1 class="text-lg font-medium mb-1">Breakdowns</h1>
        <div class="flex flex-row space-x-4 w-full">
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Weekly Expenses</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Miscellaneous</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$64.56</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Transportation</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$32.58</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Damage</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$100</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Maintenance</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$100</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Total expenses</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$409.35</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Your Stats</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell># of services provided</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>4-8</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Time spent dog walking</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>12.33</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Time spent on other tasks</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>1hr</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total revenue</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$904.32</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total tips</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$74.44</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Gross earnings</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$978.76</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        <div class="w-full mt-4">
            <Table>
                <TableHead>
                    <TableHeadCell>Earning Summary</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                    <TableBodyRow>
                        <TableBodyCell>Gross earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$978.76</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="font-bold">Net Earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$569.41</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
    </div>

    {:else if $page.data.user?.platform == "upwork"}
    <div class="w-3/4 flex flex-col items-start p-2">
        <h1 class="text-lg font-medium mb-1">Breakdowns</h1>
        <div class="flex flex-row space-x-4 w-full">
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Weekly Expenses</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell>Miscellaneous</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$100.09</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Internet/ Home</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$30.02</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Equipment</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$32.00</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Insurance</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$60.00</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Software</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$30.20</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Total expenses</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$252.31</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
            <div class="w-1/2">
                <Table>
                    <TableHead>
                        <TableHeadCell>Your Stats</TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell></TableHeadCell>
                    </TableHead>
                    <TableBody tableBodyClass="divide-y">
                        <TableBodyRow>
                            <TableBodyCell># of services provided</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>4</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Time spent working (Daily)</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>8hr</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell>Total Bonus</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$55.44</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyRow>
                            <TableBodyCell class="font-bold">Gross earnings</TableBodyCell>
                            <TableBodyCell></TableBodyCell>
                            <TableBodyCell>$978.76</TableBodyCell>
                        </TableBodyRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        <div class="w-full mt-4">
            <Table>
                <TableHead>
                    <TableHeadCell>Earning Summary</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                    <TableBodyRow>
                        <TableBodyCell>Gross earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$100.76</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="font-bold">Total earnings</TableBodyCell>
                        <TableBodyCell></TableBodyCell>
                        <TableBodyCell>$920.51</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div>
    </div>
    {/if}
    <div class="w-full mt-4 flex flex-col items-center">
        <div class="mt-2">
            <Button class="text-white bg-blue-400">Content</Button>
            <Tooltip 
                type="custom" 
                defaultClass="" 
                class="p-4 text-lg font-medium bg-blue-500 text-gray-100" 
                arrow={false}>
                The content displayed is an example of breakdowns layout. It does not contain real user data.
            </Tooltip>
        </div>
        <div class="flex space-x-4 mt-4">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={previousPage}>
                Previous
            </button>
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={nextPage}>
                Continue
            </button>
        </div>
    </div>
</div>
