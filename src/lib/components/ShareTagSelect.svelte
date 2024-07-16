<script lang="ts">
    import { page } from "$app/stores";
    import { Checkbox } from "flowbite-svelte";
    export let tags : string[]
    export let platform : string
    const uberTags = [
        {value: "safety", label: "Safety"},
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "ratings", label: "Ratings"},
        {value: "working time", label: "Working Time"},
        {value: "care-giving", label: "Care-giving"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        {value: "other", label: "Other"}
    ]

    const roverTags = [
        {value: "safety", label: "Safety"},
        {value: "fair pay", label: "Fair Pay"},
        {value: "discrimination", label: "Discrimination"},
        {value: "ratings", label: "Ratings"},
        {value: "working time", label: "Working Time"},
        {value: "care-giving", label: "Care-giving"},
        {value: "stress", label: "Stress (e.g. from precarity)"},
        {value: "understanding algorithms", label: "Understanding Algorithms"},
        {value: "other", label: "Other"}
    ]

    function saveTags(method:string) {
        
    }
</script>

<h1>What issue would you like to share?</h1>
{#if platform == "rover"}
<Checkbox bind:group={tags} choices={roverTags}/>
{:else if platform == "uber"}
<Checkbox bind:group={tags} choices={uberTags}/>
{/if}

<p>From component {tags}</p>