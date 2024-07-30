<script lang="ts">
    import PostCard from "$lib/components/PostCard.svelte";
    import { Button, Dropdown, Checkbox, Accordion, AccordionItem } from 'flowbite-svelte';
    export let data
    import { updateTitle } from "$lib/stores/title";
    updateTitle("Story Feed");
    import {createFilterStore, filterHandler} from '$lib/filter'
    import { onDestroy } from "svelte";
    let dataToDisplay = data.posts

    const filterStore = createFilterStore(dataToDisplay)

    const unsubscribe = filterStore.subscribe((model) => filterHandler(model))

    $: platform_all = true
    $: type_all = true

    $: roverCheck = true
    $: uberCheck = true
    $: upworkCheck = true

    $: issueCheck = true
    $: strategyCheck = true

    //checkboxes:
    // const uberCheck = document.getElementById("uber")
    // const upworkCheck = document.getElementById("upwork")

    onDestroy(()=> {
        unsubscribe()
    })


    // function filterContent(filter) {
    //     let newButton = document.getElementById(filter)
    //     newButton.style.backgroundColor = '#D32F2F'
    //     let oldButton = document.getElementById(currentFilter)
    //     oldButton.style.backgroundColor = '#000000'
    //     currentFilter = filter
    //     if (filter == "rover") {
    //         $filterStore.platform_filter = "rover"
    //     }
    //     else if (filter == "uber") {
    //         $filterStore.platform_filter = "uber"
    //     }
    //     else if (filter == "upwork") {
    //         $filterStore.platform_filter = "upwork"
    //     }
    //     else if (filter == "all") {
    //         $filterStore.platform_filter = ""
    //     }
    // }

    function onClick(group:string, box:string) {
        if (group == 'platform') {
            if (box == 'all') {
                if (platform_all) {
                    $filterStore.platform_filter = []
                    roverCheck = false
                    uberCheck = false
                    upworkCheck = false
                    // try{
                    //     let rover = document.getElementById('rover') as HTMLInputElement
                    //     let uber = document.getElementById('uber') as HTMLInputElement
                    //     let upwork = document.getElementById('upwork') as HTMLInputElement
                    // } finally {
                    //     $filterStore.platform_filter = []
                    //     roverCheck = false
                    //     uberCheck = false
                    //     upworkCheck = false
                    // }
                }
                else {
                    roverCheck = true
                    uberCheck = true
                    upworkCheck = true
                    $filterStore.platform_filter = ['rover', 'uber', 'upwork']
                }
            }
            else if (box == 'rover') {
                if (roverCheck) {
                    platform_all = false
                    $filterStore.platform_filter = $filterStore.platform_filter.filter((item)=>{return item !== 'rover'})
                    console.log($filterStore.platform_filter)
                }
                else {
                    console.log('adding')
                    $filterStore.platform_filter = [...$filterStore.platform_filter, 'rover']
                }
            }
            else if (box == 'uber') {
                if (uberCheck) {
                    platform_all = false
                    $filterStore.platform_filter = $filterStore.platform_filter.filter((item)=>{return item != 'uber'})
                }
                else {
                    $filterStore.platform_filter = [...$filterStore.platform_filter, 'uber']
                }
            }
            else if (box == 'upwork') {
                if (upworkCheck) {
                    platform_all = false
                    $filterStore.platform_filter = $filterStore.platform_filter.filter((item)=>{return item != 'upwork'})
                }
                else {
                    $filterStore.platform_filter = [...$filterStore.platform_filter, 'upwork']
                }
            }
        }

        if (group == "type") {
            if (box == 'all') {
                if (type_all) {
                    $filterStore.type_filter = []
                    issueCheck = false
                    strategyCheck = false
                }
                else {
                    $filterStore.type_filter = ['issue', 'strategy']
                    issueCheck = true
                    strategyCheck = true
                }
            }
            else if (box == 'issue') {
                if (issueCheck) {
                    type_all = false
                    $filterStore.type_filter = $filterStore.type_filter.filter((item)=>{ return item != 'issue'})
                }
                else {
                    $filterStore.type_filter = [...$filterStore.type_filter, 'issue']
                }
            }

            else if (box == 'strategy') {
                if (strategyCheck) {
                    type_all = false
                    $filterStore.type_filter = $filterStore.type_filter.filter((item)=>{ return item != 'strategy'})
                }
                else {
                    $filterStore.type_filter = [...$filterStore.type_filter, 'strategy']
                }
            }
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
    <div class="justify-end">
        <Accordion>
            <AccordionItem>
                    <span slot="header" class="text-base flex gap-2">
                        <input type="checkbox" id="all platforms " bind:checked={platform_all} on:click={()=>{onClick('platform', 'all')}}>
                        <span>All Platforms</span>
                    </span>
                    <div id="platform">
                        <div>
                            <input id="rover" type="checkbox" bind:checked={roverCheck} on:click={()=>{onClick('platform', 'rover')}}>
                            <span>Rover</span>
                        </div>
                        <div>
                            <input id="uber" type="checkbox" bind:checked={uberCheck} on:click={()=>{onClick('platform', 'uber')}}>
                            <span>Uber</span>
                        </div>
                        <div>
                            <input id="upwork" type="checkbox" bind:checked={upworkCheck} on:click={()=>{onClick('platform', 'upwork')}}>
                            <span>Upwork</span>
                        </div>
                    </div>
            </AccordionItem>
        </Accordion>

        <Accordion>
            <AccordionItem>
                    <span slot="header" class="text-base flex gap-2">
                        <input type="checkbox" id="all types " bind:checked={type_all} on:click={()=>{onClick('type', 'all')}}>
                        <span>All Types</span>
                    </span>
                    <div id="type">
                        <div>
                            <input id="issue" type="checkbox" bind:checked={issueCheck} on:click={()=>{onClick('type', 'issue')}}>
                            <span>Issue</span>
                        </div>
                        <div>
                            <input id="strategy" type="checkbox" bind:checked={strategyCheck} on:click={()=>{onClick('type', 'strategy')}}>
                            <span>Strategy</span>
                        </div>
                    </div>
            </AccordionItem>
        </Accordion>


    </div>
</div>
