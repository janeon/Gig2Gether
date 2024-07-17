<script lang="ts">
    import ShareTagSelect from "$lib/components/ShareTagSelect.svelte";
    import ShareContent from "$lib/components/ShareContent.svelte";

    $: tags = []
    $: url = ""
    $: title = ""
    $: description = ""

    $: tagSelection = false
</script>

{#if tagSelection}
    <ShareTagSelect bind:tags={tags} platform={"rover"} bind:title={title} bind:description={description} type={'issue'} bind:url={url} bind:tagSelection={tagSelection}/>
{:else}
    <ShareContent bind:title={title} bind:tagSelection={tagSelection} bind:description={description} bind:url={url} />
{/if}