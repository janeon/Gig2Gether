<script lang="ts">
    export let tags = [];
    export let bindGroup;
  </script>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {#each tags as tag}
      <label class="flex items-center">
        <input 
          type="checkbox" 
          value={tag.value} 
          bind:group={bindGroup} 
          class="mr-2"
        />
        {tag.label}
      </label>
    {/each}
  </div>
  