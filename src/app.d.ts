// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
export type User = {
	uid: string
	role: string
	email: string
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
