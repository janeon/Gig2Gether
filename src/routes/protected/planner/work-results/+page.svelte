<script lang="ts">
    import { Tooltip, Button } from "flowbite-svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { updateTitle } from "$lib/stores/title";

    updateTitle("Results");

    async function previousPage() {
        goto('./work-breakdown');
    }
</script>

<div class="flex flex-col items-center p-4">
    <div class="w-full max-w-4xl flex flex-col space-y-4 ">
    <h1 class="text-lg font-bold text-red-600 mb-4 text-center">
        ALL NUMBERS BELOW ARE SIMULATED FOR STUDY & NOT REAL DATA
    </h1>
    {#if $page.data.user?.platform == "uber"}
    <div class="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <div class="flex flex-col space-y-4">
            <p class="text-gray-700 dark:text-gray-400">
                Driving 40 hours in a week, you can expect to make a total of $978.76.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                Your earnings would be $904.32 in fares, and $74.44 in trips. Including $32.58 on insurance and $64.56 on fuel, you would total $409.35 in weekly expenses.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                After subtracting expenses, your net earnings would be $569.41.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                You would drive 90 trips a week, totaling 403.5 miles. Your average trip length would be 4.483 miles and 14.61 minutes.
            </p>
        </div>
    </div>
    {:else if $page.data.user?.platform == "rover"}
    <div class="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <div class="flex flex-col space-y-4">
            <p class="text-gray-700 dark:text-gray-400">
                By taking on 4-8 boarding and dog-walking on Tuesdays and Thursdays (between 2-4pm and 4-6pm) in X and Y neighborhoods, you can expect to make a total of $978.76.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                Your earnings would be $904.32, and $74.44 in tips.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                Including $32.58 on Bus and $64.56 on miscellaneous expenses, you would total $109.35 in weekly expenses.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                After subtracting expenses, your net earnings would be $569.41.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                You would board an average of 4 pets, and walk an average of 5.314 puppies at a rate of $20/hour.
            </p>
        </div>
    </div>
    {:else if $page.data.user?.platform == "upwork"}
    <div class="w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg">
        <div class="flex flex-col space-y-4">
            <p class="text-gray-700 dark:text-gray-400">
                Working 40 hours in a week from Tuesday - Saturday, you can expect to make a total of $1,000.76.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                Your earnings would be $945.32 in earnings, and $55.44 in bonuses.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                Including $30.00 on insurance, $20.00 on software, and $30.25 on equipment, you would total $80.25 in weekly expenses.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                After subtracting expenses, your net earnings would be $920.51.
            </p>
            <p class="text-gray-700 dark:text-gray-400">
                You would work an average of 40hr/week, making $23.01 per hour.
            </p>
        </div>
    </div>
    {/if}


        <div class="w-full flex justify-between mt-4">
            <Button on:click={previousPage} color="dark">Previous</Button>
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
        </div>
    </div>
</div>