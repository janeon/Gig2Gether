<script lang="ts">
	import { page } from '$app/stores';
	import { authUser } from '$lib/firebase/authstore';
	import { goto } from '$app/navigation';
</script>

<header class="flex justify-between items-center p-4 bg-gray-100">
	<div>
		<h1 class="text-lg font-bold">GigUnity</h1>
	</div>
	<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
		<a href="/login" class="hover:underline">Login</a>
	</button>
</header>