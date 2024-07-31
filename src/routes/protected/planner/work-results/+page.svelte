<script lang="ts">
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";
    import { Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip, Button} from "flowbite-svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    async function previousPage () {
        goto('./work-breakdown')
    }
</script>

<div class="flex flex-row">
    <div class="w-1/4 p-2">
        <PlannerSidebar />
    </div>
    
    {#if $page.data.user?.platform == "uber"}
    <div class="w-3/4 p-2">
        <div class="flex justify-center">
            <Card>
                <div class="flex flex-col">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Driving 40 hours in a week, you can expect to make a total of $978.76.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Your earnings would be $904.32 in fares, and $74.44 in trips. Including $32.58 on insurance and $64.56 on fuel, you would total $409.35 in weekly expenses.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        After subtracting expenses, your net earnings would be $569.41.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        You would drive 90 trips a week, totaling 403.5 miles. Your average trip length would be 4.483 miles and 14.61 minutes.
                    </p>
                </div>
            </Card>
            <Card>
                <div class="flex flex-col justify-items-center">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4 justify-center">
                        How much do I make per hour?
                    </p>
                    <Table>
                        <TableHead>
                            <TableHeadCell >Gross earnings</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                            <TableHeadCell>$24.47/hr</TableHeadCell>
                        </TableHead>
                        <TableBody tableBodyClass="divide-y">
                            <TableBodyRow>
                                <TableBodyCell class = "text-red-600">Expenses</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-red-600">-$10.23/hr</TableBodyCell>
                            </TableBodyRow>
                            <TableBodyRow>
                                <TableBodyCell class = "text-green-600">Net Earnings</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-green-600">$14.24/hr</TableBodyCell>
                            </TableBodyRow>
                        </TableBody>
                    </Table>

                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        This hourly pay rate is $1.56 below the minimum wage.
                    </p>
                </div>
            </Card>
        </div>
    </div>
    {:else if $page.data.user?.platform == "rover"}
    <div class="w-3/4 p-2">
        <div class="flex justify-center">
            <Card>
                <div class="flex flex-col">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        By taking on 4-8 boarding and dog-walking on Tuesdays and Thursdays (between 2-4pm and 4-6pm) in X and Y neighborhoods, you can expect to make a total of $978.76
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Your earnings would be $904.32, and $74.44 in tips. 
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Including $32.58 on Bus and $64.56 on miscellaneous expenses, you would total $109.35 in weekly expenses.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        After subtracting expenses, your net earnings would be $569.41. 
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        You would board an average of 4 pets, and walk an average of 5.314 puppies at rate of $20/hour
                    </p>
                </div>
            </Card>
            <Card>
                <div class="flex flex-col justify-items-center">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4 justify-center">
                        How much do I make per hour?
                    </p>
                    <Table>
                        <TableHead>
                            <TableHeadCell >Gross earnings</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                            <TableHeadCell>$24.47/hr</TableHeadCell>
                        </TableHead>
                        <TableBody tableBodyClass="divide-y">
                            <TableBodyRow>
                                <TableBodyCell class = "text-red-600">Expenses</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-red-600">-$10.23/hr</TableBodyCell>
                            </TableBodyRow>
                            <TableBodyRow>
                                <TableBodyCell class = "text-green-600">Net Earnings</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-green-600">$14.24/hr</TableBodyCell>
                            </TableBodyRow>
                        </TableBody>
                    </Table>

                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        This hourly pay rate is $1.56 below the minimum wage.
                    </p>
                </div>
            </Card>
        </div>
    </div>
    {:else if $page.data.user?.platform == "upwork"}
    <div class="w-3/4 p-2">
        <div class="flex justify-center">
            <Card>
                <div class="flex flex-col">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Working 40 hours in a week form Tuesday -Saturday you can expect to make a total of $1,000.76.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Your earnings would be $945.32 in earnings, and $55.44 in bonuses.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        Including $30.00 on insurance, $20.00 on software and $30.25 on equipment, you would total $80.25 in weekly expenses.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        After subtracting expenses, your net earnings would be $920.51.
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                        You would work an average of 40hr/week, making $23.01 per hour.
                    </p>
                </div>
            </Card>
            <Card>
                <div class="flex flex-col justify-items-center">
                    <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4 justify-center">
                        How much do I make per hour?
                    </p>
                    <Table>
                        <TableHead>
                            <TableHeadCell >Gross earnings</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                            <TableHeadCell>$25.01/hr</TableHeadCell>
                        </TableHead>
                        <TableBody tableBodyClass="divide-y">
                            <TableBodyRow>
                                <TableBodyCell class = "text-red-600">Expenses</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-red-600">-$2/hr</TableBodyCell>
                            </TableBodyRow>
                            <TableBodyRow>
                                <TableBodyCell class = "text-green-600">Net Earnings</TableBodyCell>
                                <TableBodyCell></TableBodyCell>
                                <TableBodyCell class = "text-green-600">$23.01/hr</TableBodyCell>
                            </TableBodyRow>
                        </TableBody>
                    </Table>
                </div>
            </Card>
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
                The content displayed is an example of results layout. It does not contain real user data.
            </Tooltip>
        </div>
        <div class="flex space-x-4 mt-4">
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={previousPage}>
                Previous
            </button>
        </div>
    </div>
</div>
