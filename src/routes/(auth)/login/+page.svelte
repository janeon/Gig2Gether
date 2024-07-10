<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col items-center">

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-6/12"
	action="?/login" method="post"
>
	<input
		type="email"
		placeholder="Email"
		id="email"
		name="email"
		class="px-4 py-2 border border-gray-300 rounded-md"
		required
	/>
	<input
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		class="px-4 py-2 border border-gray-300 rounded-md"
		required
	/>
	<button type="submit" class="default-action">Login</button>

	<!-- {#if !success && success !== undefined}
		<div class="p-8 text-red-500 bg-red-100">{customError.message}</div>
	{/if} -->
</form>
</div>