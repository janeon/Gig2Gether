import { db } from '$lib/firebase/client';
import { capitalize } from '$lib/utils';
import type { Data } from '$lib/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import type { User } from '../../../app';

export async function _load(user:User) {
	
	let postedData = [];
	// stories
	let snapshot = await getDocs(
		query(collection(db, 'stories', user.platform, 'posts'), 
		where('uid', '==', user.uid),
		orderBy("date", "desc"))
	);
	snapshot.forEach((doc) => {
		const post: Data = { timestamp: new Date(), type: '', title: '', id: '', platform: '' };
		post.platform = user.platform;
		post.timestamp = doc.data().date.toDate();
		post.type = 'Story';
		post.title = doc.data().title;
		post.id = doc.id;
		postedData.push(post);
	});

	// expenses
	snapshot = await getDocs(
		query(
			collection(db, 'upload', 'expenses', user.platform),
			where('uid', '==', user.uid),
			orderBy("timestamp", "asc")
		)
	);
	let expenseCount = 1;
	snapshot.forEach((doc) => {
		const post: Data = { timestamp: new Date(), type: '', title: '', id: '', platform: '' };
		post.platform = user.platform;
		post.timestamp = doc.data().timestamp.toDate();
		post.type = 'Expense';
		post.title = 'Expense #' + expenseCount;
		post.id = doc.id;
		postedData.push(post);
		expenseCount++;
	});

	// income entries
	if (user.platform === 'uber') {
		// quests & trips
		for (const entryType of ['quests', 'trips']) {
			snapshot = await getDocs(
				query(collection(db, 'upload', 'manual', entryType), 
				where('uid', '==', user.uid),
				orderBy("timestamp", "asc")
			));
			let count = 1;
			snapshot.forEach((doc) => {
				const post: Data = { timestamp: new Date(), type: '', title: '', id: '', platform: '' };
				post.platform = user.platform;
				post.timestamp = doc.data().timestamp.toDate();
				post.type = entryType.charAt(0).toUpperCase() + entryType.slice(1);
				post.title = doc.data().notes || '';
				let title = '';
				for (const item of [doc.data().note, post.type]) {
					if (item)
						title += item + ' ';
				}
				post.title = title.substring(0, title.length-2)+' #'+count;
				post.id = doc.id;
				postedData.push(post);
				count++;
			});
		}
	} else {
		// upwork & rover incomes
		snapshot = await getDocs(
			query(
				collection(db, 'upload', 'manual', user.platform),
				where('uid', '==', user.uid),
				orderBy("timestamp", "asc")
			)
		);
		let incomeCount = 1;
		snapshot.forEach((doc) => {
			const post: Data = { timestamp: new Date(), type: '', title: '', id: '', platform: '' };
			post.platform = user.platform;
			post.timestamp = doc.data().timestamp.toDate();
			post.type = 'Income';
			post.title = '';
			let title = '';
			for (const item of [doc.data().notes, capitalize(doc.data().type)]) {
				title += item + ' ';
			}
			post.title = title.substring(0, title.length ) + ' #' + incomeCount;
			post.id = doc.id;
			postedData.push(post);
			incomeCount++;
		});
	}

	// uber csvs
	let csvCount = 1;
	snapshot = await getDocs(
		query(collection(db, 'upload', 'csv', 'entries'), 
		where('uid', '==', user.uid),
		orderBy("timestamp", "asc")
	)
	);
	snapshot.forEach((doc) => {
		const post: Data = { timestamp: new Date(), type: '', title: '', id: '', platform: '' };
		post.platform = user.platform;
		post.timestamp = doc.data().timestamp.toDate();
		post.type = 'CSV';
		post.title = '#' + csvCount + ': ' + doc.data().title ;
		post.id = doc.id;
		postedData.push(post);
		csvCount++;
	});

	postedData = postedData.sort((a: Data, b: Data) => {
		return a.timestamp.getTime() - b.timestamp.getTime();
	});

	
	return {
		posts: postedData
	};
}
