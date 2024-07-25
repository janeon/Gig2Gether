<script type="ts">
    import PostCard from "$lib/components/PostCard.svelte";
    export let data
    import {Button} from "$lib/components/ui/button";
    import {createFilterStore, filterHandler} from '$lib/filter'
    import { onDestroy } from "svelte";
    let currentFilter = "all"
    let dataToDisplay = data.posts

    const filterStore = createFilterStore(dataToDisplay)

    const unsubscribe = filterStore.subscribe((model) => filterHandler(model))

    onDestroy(()=> {
        unsubscribe()
    })
    function filterContent(filter) {
        let newButton = document.getElementById(filter)
        newButton.style.backgroundColor = '#D32F2F'
        let oldButton = document.getElementById(currentFilter)
        oldButton.style.backgroundColor = '#000000'
        currentFilter = filter
        if (filter == "rover") {
            $filterStore.platform_filter = "rover"
        }
        else if (filter == "uber") {
            $filterStore.platform_filter = "uber"
        }
        else if (filter == "upwork") {
            $filterStore.platform_filter = "upwork"
        }
        else if (filter == "all") {
            $filterStore.platform_filter = ""
        }
    }
</script>

<div class="flex flex-row">
    <div class="w-full justify-items-center">
        {#if $filterStore.filtered.length > 0}
            {#each $filterStore.filtered as post}
                <PostCard postData={post}/>
            {/each}
            {:else}
                <p class="text-center">There are no posts yet!</p>
        {/if}
    </div>
    <div class="w-1/7 justify-end">
        <div class="border-b justify-items-center flex flex-col space-y-2 py-2 ">
            <Button id="all" class = "bg-red-700" on:click={()=>{filterContent("all")}}>All</Button>
            <Button id= "rover" on:click={()=>{filterContent("rover")}}>Rover</Button>
            <Button id = "uber" on:click={()=>{filterContent("uber")}}>Uber</Button>
            <Button id = "upwork" on:click={()=>{filterContent("upwork")}}>Upwork</Button>
        </div>
    </div>
</div>
