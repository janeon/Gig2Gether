import { writable } from 'svelte/store';

export const profileStatus = writable({
    isCompleted: "green",
});
