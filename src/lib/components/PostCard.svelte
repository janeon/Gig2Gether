<script lang="ts">
    import type { Post } from "$lib/types";
    import {page} from '$app/stores'
    export let postData : Post
    import '@fortawesome/fontawesome-free/css/all.min.css'
    import { doc, updateDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client";
    
    let likes = postData.likes
    const changeLikes = async()=> {
        let newLikes
        const post = doc(db, 'stories', postData.platform, "posts", postData.id)
        if (likes.includes($page.data.user.uid)) {
            newLikes = postData.likes.filter((item)=> {item !== $page.data.user.uid})
        }
        else {
            newLikes = [...postData.likes, $page.data.user.uid]
        }
        likes = newLikes
        await updateDoc(post, {likes: newLikes})
    }
</script>

<div class="border-t p-3 justify-items-center">
    <div class="">
        <div class="flex items-center text-xs text-gray-500 gap-1">
            <h3 class="capitalize text-sm font-semibold">{postData.username}</h3>
            <!-- {postData.date.getHours()}:{postData.date.getMinutes()} -->
            <!-- {dayNames[postData.date.getDay()]} {postData.date.getMonth() +1}/{postData.date.getDate()}/{postData.date.getFullYear()} -->
            <p>{postData.date.toLocaleDateString('en-US', {dateStyle:'full'})} {postData.date.toLocaleTimeString('en-US', {timeStyle:'short'})}</p>
        </div>
        <p class="text-lg flex flex-wrap break-words mb-2">
			{postData.title}
		</p>
        <p class="text-sm flex flex-wrap break-words mb-2">
			{postData.description}
		</p>
        {#if postData.url}
            <img src={postData.url} class="rounded-sm mt-2 object-contain w-1/2" alt="" />
        {/if}
        <div class="flex justify-between text-sm mt-2">
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div class="p-1 rounded-full group-hover:bg-blue-500/20" on:click={changeLikes}>
					{#if likes.includes($page.data.uid)}
                        <i class="fa-solid fa-heart text-blue-500"></i>
					{:else}
                        <i class="fa-regular fa-heart group-hover:text-blue-500"></i>
					{/if}
				</div>
				<span class="group-hover:text-blue-500"> {likes.length}</span>
			</button>
		</div>
    </div>
</div>