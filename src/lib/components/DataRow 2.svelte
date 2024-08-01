<!-- For viewing uploaded data in withdraw -->
<script lang="ts">
    import type { Data } from "$lib/types";

    export let docInfo:Data
    export let checkBind:Data[]

    const onClick = () => {
        if (checkBind.includes(docInfo)) {
            checkBind = checkBind.filter((item)=> {
                return item.id !== docInfo.id
            })
        }
        else {
            checkBind = [...checkBind, docInfo]
        }
    }
</script>

<div class="flex flex-row border-2">
    <input type="checkbox" on:click={onClick}/>
    <p class="px-2 border-r-2">{docInfo.date.toLocaleDateString('en-US', {dateStyle:'short'})}</p>
    <p class="px-2 border-r-2">{docInfo.type}</p>
    <p class="px-2 ">{docInfo.title}</p>
</div>