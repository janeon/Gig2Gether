<script lang="ts">
    import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import { db } from '$lib/firebase/client';
	import { updateTitle } from '$lib/stores/title';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { Label, Radio, Textarea } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    
    let surveyResponse = {
        feedback: '',
        score: '',
        reason: ''
    } as any;
    let submitted = false;
    onMount(async () => {
        const docRef = doc(db, 'logging', 'surveys', $page.data.user.uid, new Date().toISOString().split('T')[0]);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            surveyResponse = docSnap.data();
            submitted = true;
        }
    });
    
    updateTitle('Daily Survey');    

    async function respond() {
        const docRef = doc(db, 'logging', 'surveys', $page.data.user.uid, new Date().toISOString().split('T')[0]);
        await setDoc(docRef, surveyResponse);
        submitted = true;
    }

</script>
<div class="flex flex-col">
<Label class="mt-4">Any feedback or suggestions for improving the app? </Label>
<Textarea type="text" bind:value={surveyResponse.feedback} class="mt-1" />

<Label class="mt-4">How would you rate the app? </Label>
<ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600">
    <li class="w-full"><Radio name="hor-list" bind:group={surveyResponse.score} value="1" class="p-3">1</Radio></li>
    <li class="w-full"><Radio name="hor-list" bind:group={surveyResponse.score} value="2" class="p-3">2</Radio></li>
    <li class="w-full"><Radio name="hor-list" bind:group={surveyResponse.score} value="3" class="p-3">3</Radio></li>
    <li class="w-full"><Radio name="hor-list" bind:group={surveyResponse.score} value="4" class="p-3">4</Radio></li>
    <li class="w-full"><Radio name="hor-list" bind:group={surveyResponse.score} value="5" class="p-3">5</Radio></li>
</ul>

<Label for="equipment" class="mt-4">What reasons made you rate it {surveyResponse.score} today? </Label>
<Textarea type="text" bind:value={surveyResponse.reason} class="mt-1" />

<Button class="btn btn-primary mt-4" on:click={respond}>{submitted ? "Update" : "Submit"}</Button>
</div>