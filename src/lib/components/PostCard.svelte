<script lang="ts">
    import type { Post } from "$lib/types";

    export let postData : Post
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
</script>

<div class="border-t p-3">
    <div class="w-1/2">
        <div class="flex items-center text-xs text-gray-500 gap-1">
            <h3 class="capitalize text-sm font-semibold">{postData.uid}</h3>
            <p>{dayNames[postData.date.getDay()]} {postData.date.getMonth() +1}/{postData.date.getDate()}/{postData.date.getFullYear()} {postData.date.getHours()}:{postData.date.getMinutes()}</p>
        </div>
        <p class="text-lg flex flex-wrap break-words mb-2">
			{postData.title}
		</p>
        <p class="text-sm flex flex-wrap break-words mb-2">
			{postData.description}
		</p>
        {#if postData.url}
            <img src={postData.url} class="rounded-sm mt-2 object-contain w-full" alt="" />
        {/if}
    </div>
</div>