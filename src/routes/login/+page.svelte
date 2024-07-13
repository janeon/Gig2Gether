<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types'; 
	export let form : ActionData;
	$: console.log(form);
</script>

<main>
	 {#if form?.formErrors}
		<article>
			<div style="color: red;">
				{form.formErrors}
			</div>
		</article>
	{/if}
	<div class="flex flex-col items-center">
		<form method="POST" use:enhance 
		class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
		>
			<input type="email" placeholder="email" name="email" 
			class="px-4 py-2 border border-gray-300 rounded-md"/>
			<input type="password" placeholder="password" name="password" 
			class="px-4 py-2 border border-gray-300 rounded-md"/>

			<button type="submit" class="default-action">Login</button>
		</form>
	</div>
</main>