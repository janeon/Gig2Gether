import { db } from '$lib/firebase/client';
import type { Data } from '$lib/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export async function load({ parent }) {
	let postedData = [];
	const data = await parent();

	// stories
	const snapshot = await getDocs(
		query(collection(db, 'stories', data.user.platform, 'posts'), 
		where('uid', '==', data.user.uid),
		orderBy("date", "desc"))
	);
	snapshot.forEach((doc) => {
		const post: Data = { date: new Date(), type: '', title: '', id: '', platform: '' };
		post.platform = data.user.platform;
		post.date = doc.data().date.toDate();
		post.type = 'Story';
		post.title = doc.data().title;
		post.id = doc.id;
		postedData.push(post);
	});

    postedData = postedData.sort((a: Data, b: Data) => {
		return a.date.getTime() - b.date.getTime();
	});

	return {
		posts: postedData
	};
}
