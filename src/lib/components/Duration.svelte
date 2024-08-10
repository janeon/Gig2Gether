<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Input } from 'flowbite-svelte';

    export let hours: number | null = null;
    export let minutes: number | null = null;
    export let className = '';

    const dispatch = createEventDispatcher();

    function handleHoursChange(event) {
        hours = parseInt(event.target.value) || null;
        dispatch('change', { hours, minutes });
    }

    function handleMinutesChange(event) {
        minutes = parseInt(event.target.value) || null;
        dispatch('change', { hours, minutes });
    }
</script>

<div class="flex items-center space-x-4">
    <div class="w-1/2">
        <!-- <label for="hours" class="block text-sm font-medium text-gray-700">Hours</label> -->
        <Input
            id="hours"
            type="number"
            min="0"
            max="50"
            value={hours !== null ? hours : ''}
            on:input={handleHoursChange}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Hours"
        />
    </div>
    <div class="w-1/2">
        <!-- <label for="minutes" class="block text-sm font-medium text-gray-700">Minutes</label> -->
        <Input
            id="minutes"
            type="number"
            min="0"
            max="59"
            value={minutes !== null ? minutes : ''}
            on:input={handleMinutesChange}
            class={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            placeholder="Minutes"
        />
    </div>
</div>
