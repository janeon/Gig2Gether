<script lang="ts">
    export let icon: any = `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
    </svg>` ;
    export let placeholder = '';
    export let value = ''; // Bind this value to the input
    export let className = '';

    const allowedPattern = /^[\d+\-*/().]*$/;

    function handleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!allowedPattern.test(input.value)) {
        // Remove invalid characters
        input.value = input.value.replace(/[^0-9+\-*/().]/g, '');
        value = input.value;
        } else {
        value = input.value;
        }
    }

    function handleBlur() {
        // Perform arithmetic calculation
        const result = calculate(value);
        // // Update the input value with the result
        value = result;
    }

  function calculate(expression: string): string {
    try {
      if (allowedPattern.test(expression)) {
        const evaluated = eval(expression);
        if (isNaN(evaluated) || (expression === evaluated.toString())) {
          return expression; // Return original if evaluation is not a number, or no change in value
        }
        return `${expression}=${evaluated}`;
      }
      return expression; // Return original if invalid characters are present
    } catch (error) {
      return expression; // Return original if there's an error in evaluation
    }
  }

  </script>
  
  <div class="relative flex items-center">
    {#if icon}
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        {#if typeof icon === 'string'}
          {@html icon}
        {:else if typeof icon === 'function'}
          <svelte:component this={icon} class="w-6 h-6 text-gray-500" />
        {/if}
      </span>
    {/if}
    <input
      type="text"
      placeholder={placeholder}
      bind:value
      on:input={handleInput}
      on:blur={handleBlur}
      min="0"
      pattern="[0-9]+"
      class={`mt-1 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md w-full ${className}`}    />
  </div>
  