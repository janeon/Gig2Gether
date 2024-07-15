export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/(auth)/login": [~3],
		"/(auth)/logout": [~4],
		"/protected": [6],
		"/protected/(settings)/account": [7],
		"/protected/(settings)/demographics": [8],
		"/protected/(settings)/profile": [9],
		"/protected/(settings)/sharingpreferences": [10],
		"/(auth)/register": [~5]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';