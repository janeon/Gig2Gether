<script lang="ts">
    import { Label, NumberInput, Select } from "flowbite-svelte";
    export let label;
    export let type = "text";
    export let items = [];
    export let bindValue;
    export let inputClass = "border-2";

    let isSelect = type === "select";
</script>

<div class="flex flex-col">
  <Label>{label}</Label>
  {#if isSelect}
    <Select items={items} bind:value={bindValue} />
  {:else}
    <NumberInput class={inputClass} bind:value={bindValue} type={type} />
  {/if}
</div>
