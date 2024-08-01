import { writable } from 'svelte/store';
import { onMount } from 'svelte';

export const title = writable('');

export function updateTitle(newTitle: string) {
    onMount(() => {
        title.set(newTitle);
    });
    
}