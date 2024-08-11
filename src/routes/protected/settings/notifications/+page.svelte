<script lang="ts">
    import { Checkbox, Select } from 'flowbite-svelte';

    let isChecked = false;

    const options = [
        { value: 'day', name: 'Everyday' },
        { value: 'week', name: 'Every Week' },
        { value: 'month', name: 'Every Month' }
    ];

    let selectedOption: string = '';
</script>

<div>
    <Checkbox bind:checked={isChecked} class="text-lg font-bold">
        Allow Reminder Notifications
    </Checkbox>

    {#if isChecked}
        <Select bind:value={selectedOption} class="mt-4">
            {#each options as option}
                <option value={option.value}>{option.name}</option>
            {/each}
        </Select>
    {/if}
</div>
