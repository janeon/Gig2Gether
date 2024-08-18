<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Input } from 'flowbite-svelte';
	import { handleKeyDown } from '$lib/utils';

    export let hours: number | null = null;
    export let minutes: number | null = null;
    export let className = '';

    const dispatch = createEventDispatcher();

    function handleHoursChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        hours = inputElement.value ? parseInt(inputElement.value) : null;
        dispatch('change', { hours, minutes });
    }

    function handleMinutesChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        minutes = inputElement.value ? parseInt(inputElement.value) : null;
        dispatch('change', { hours, minutes });
    }

</script>

<div class="flex items-center space-x-4">
    <div class="w-1/2">
        <Input
            id="hours"
            type="number"
            min="0"
            max="50"
            value={hours !== null ? hours : ''}
            on:input={handleHoursChange}
            on:keydown={handleKeyDown} 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Hours"
        />
    </div>
    <div class="w-1/2">
        <Input
            id="minutes"
            type="number"
            min="0"
            max="59"
            value={minutes !== null ? minutes : ''}
            on:input={handleMinutesChange}
            on:keydown={handleKeyDown} 
            class={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            placeholder="Minutes"
        />
    </div>
</div>
