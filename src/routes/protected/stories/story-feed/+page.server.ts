import { db } from '$lib/firebase/client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export async function load() {
	const platforms = ['rover', 'uber', 'upwork'];
	let posts = [];
	for (const platform of platforms) {
		const snapshot = await getDocs(
			query(collection(db, 'stories', platform, 'posts'), orderBy('date', 'desc'))
		);
		snapshot.forEach(async (item) => {
			const post = item.data();
			post.date = post.date.toDate();
			post.id = item.id;
			posts.push(post);
		});
	}
	posts = posts.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});

	return {
		posts: posts
	};
}
