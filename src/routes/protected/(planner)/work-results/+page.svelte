<script lang="ts">
    import { Card } from "flowbite-svelte";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { goto } from "$app/navigation";
    import PlannerSidebar from "$lib/components/PlannerSidebar.svelte";

    async function continueClick () {
        goto('/protected/work-breakdown')
    }

    async function backClick () {
        goto('/protected/work-time')
    }

</script>



<div class = "flex flex-row">
    <div class = "w-1/4 p-2">
        <PlannerSidebar/>
    </div>

    <div class = "w-3/4 p-2 flex-row">
        <div class = "flex justify-center">
            <div class = "flex flex-row">
                <Card href="/cards">
                    <div class = "flex flex-col">
                        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight mb-4">
                            Working 40 hours in a week form Tuesday-Saturday you can expect to make a total of $1,000.76
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

                  <Card href="/cards">
                    <div class="flex flex-col">
                        <p class="font-normal text-gray-500 dark:text-gray-400 leading-tight mb-4 justify-center">
                            How much do I make per hour?
                        </p>
                        <Table>
                            <TableHead>
                                <TableHeadCell></TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                                <TableHeadCell></TableHeadCell>
                            </TableHead>
                            <TableBody tableBodyClass="divide-y">
                                <TableBodyRow>
                                    <TableBodyCell>Gross earnings</TableBodyCell>
                                    <TableBodyCell></TableBodyCell>
                                    <TableBodyCell>$25.01/hr</TableBodyCell>
                                </TableBodyRow>
                                <TableBodyRow>
                                    <TableBodyCell class = "text-red-700">Expenses</TableBodyCell>
                                    <TableBodyCell></TableBodyCell>
                                    <TableBodyCell class = "text-red-700">-$2/hr</TableBodyCell>
                                </TableBodyRow>
                                <TableBodyRow>
                                    <TableBodyCell class = "text-green-700">Net Earnings</TableBodyCell>
                                    <TableBodyCell></TableBodyCell>
                                    <TableBodyCell class = "text-green-700">$23.1/hr</TableBodyCell>
                                </TableBodyRow>
                            </TableBody>
                        </Table>
                        <p class="font-normal text-gray-500 dark:text-gray-400 leading-tight mb-4 mt-7">
                            This hourly pay rate is $1.56 below the minimum wage
                        </p>
                    </div>
                  </Card>
            </div>
        
        </div>


        <div class="flex justify-center mt-6">
            <button
                class="bg-black text-white py-2 px-4 rounded mr-8"
                on:click={backClick}>
                Back
            </button>
            <button
                class="bg-black text-white py-2 px-4 rounded"
                on:click={continueClick}>
                Continue
            </button>
            
        </div>
       
    </div>

</div>