<!-- For viewing uploaded data in withdraw -->
<script lang="ts">
	import type { Data } from '$lib/types';

	export let docInfo: Data;
	export let checkBind: Data[];

	const clickCheck = () => {
		if (checkBind.includes(docInfo)) {
			checkBind = checkBind.filter((item) => {
				return item.id !== docInfo.id;
			});
		} else {
			checkBind = [...checkBind, docInfo];
		}
	};

	function getDocPath(platform: string, type: string, id: string) {
	const paths = {
		rover: {
			Income: '/protected/upload/manual',
			Expense: '/protected/upload/expenses',
			Story: '/protected/stories/share-story'
		},
		upwork: {
			Income: '/protected/upload/manual',
			Expense: '/protected/upload/expenses',
			Story: '/protected/stories/share-story'
		},
		uber: {
			Story: '/protected/stories/share-story',
			Trips: '/protected/upload/trips',
			Quests: '/protected/upload/quests',
			CSV: '/protected/upload/CSV',
			Expense: '/protected/upload/expenses'
		}
	};

	const basePath = paths[platform]?.[type] || '/';

	// If an id is provided, append it as a search parameter
	if (id) {
		return `${basePath}?id=${encodeURIComponent(id)}`;
	}

	return basePath;
}

</script>

<div class="flex flex-row border-2 items-center">
	<input type="checkbox" on:click={clickCheck} />
	<p class="px-2 border-r-2">{docInfo.timestamp.toLocaleDateString('en-US', { dateStyle: 'short' })}</p>
	<p class="px-2 border-r-2">{docInfo.type}</p>
	<a
		href={getDocPath(docInfo.platform, docInfo.type, docInfo.id)}
		class="text-blue-500 hover:text-blue-700 underline flex-grow text-center">{docInfo.title}</a
	>
</div>
