<script lang="ts">
	import type { Post } from '$lib/types';
	import { page } from '$app/stores';
    import type { ColorVariant } from '../types';
    
    import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/client';

    import { Badge } from 'flowbite-svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	
    export let postData: Post;

	let likes = postData.likes;
	const changeLikes = async () => {
		const postRef = await doc(db, 'stories', postData.platform, 'posts', postData.id);
		const docSnap = await getDoc(postRef);
		likes = docSnap.data().likes;
        postData.likes = likes;

		// Optimistically update the local state
		let newLikes;
		if (likes.includes($page.data.user.uid)) {
			// Unlike the post
			newLikes = likes.filter((item) => item !== $page.data.user.uid);
            
		} else {
			// Like the post
			newLikes = [...likes, $page.data.user.uid];
		}

		// Update Firestore
		try {
			await updateDoc(postRef, { likes: newLikes });
			// If Firestore update is successful, update the local state
			likes = newLikes;
		} catch (error) {
			console.error('Error updating likes:', error);
			// Optionally, revert local state if the Firestore update fails
		}
	};

    const tagColorMap = {
        'fair pay': 'green',
        'discrimination': 'red',
        'ratings': 'purple',
        'work time': 'yellow',
        'stress': 'indigo',
        'deactivation': 'dark',
        'technology': 'pink',
        'other': 'default',
        'safety': 'red',
        'care-giving': 'green',
        'algorithms': 'purple',
        'scams': 'dark',
        'getting started': 'yellow',
        'customers': 'indigo'
    };
    
    function getTagColor(tagValue) {
        return tagColorMap[tagValue] as ColorVariant; // Default color if no match is found
    }
</script>

<div class="border-t p-3 justify-items-center">
	<div class="">
		<div class="text-xs text-gray-500 gap-1">
			<h3 class="capitalize text-sm font-semibold">{postData.username}</h3>
			<!-- {postData.date.getHours()}:{postData.date.getMinutes()} -->
			<!-- {dayNames[postData.date.getDay()]} {postData.date.getMonth() +1}/{postData.date.getDate()}/{postData.date.getFullYear()} -->
		</div>
		<p class="text-xs text-gray-500 gap-1">
			{postData.date.toLocaleDateString('en-US', { dateStyle: 'full' })}
			{postData.date.toLocaleTimeString('en-US', { timeStyle: 'short' })}
		</p>
		<p class="text-lg flex flex-wrap break-words mb-2">
			{postData.title}
		</p>
		<p class="text-sm flex flex-wrap break-words mb-2">
			{postData.description}
		</p>
		{#if postData.url}
			<img src={postData.url} class="rounded-sm mt-2 object-contain w-1/2" alt="" />
		{/if}
        {#if postData.tags}
            <div class="flex flex-wrap gap-2 mt-2">
                {#each postData.tags as tag}
                <Badge color={getTagColor(tag)}>{tag}</Badge>
                {/each}
            </div>
        {/if}
		<div class="flex justify-between text-sm mt-2">
			<button class="flex transition-all group items-center gap-2 text-gray-600">
				<div
					class="p-1 rounded-full group-hover:bg-blue-500/20"
					on:click={changeLikes}
					role="button"
					tabindex="0"
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							changeLikes();
						}
					}}
				>
					{#if likes.includes($page.data.user.uid)}
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
