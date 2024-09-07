import { db } from '$lib/firebase/client';
import { getDocs, query, collection, where } from 'firebase/firestore';

export async function load() {
	const testers = [
		{ pid: 'P1', uid: '2ysgAOzPhjOVnFu4aTBviDlOhqu2', platform: 'rover' },
		{ pid: 'D1', uid: 'MMa2L3GPkdOA7eOVQk4klB03o3T2', platform: 'uber' },
		{ pid: 'D2', uid: 'spp8He2nTlQvsshggYloBoeHsIf1', platform: 'uber' },
		{ pid: 'P2', uid: 'yt34lL0Dj9cuQ80QWHs9m3LU2EL2', platform: 'rover' },
		{ pid: 'F1', uid: 'u3953C6sYFYn6tKtozWaD5X3Sr63', platform: 'upwork' },
		{ pid: 'F2', uid: 'Y5M2Yhj4IvRiNJB3UYm48Wi3sk73', platform: 'upwork' },
		{ pid: 'D3', uid: 'cXXnMnFZXKeuzXeFCgrGpzMJHNI3', platform: 'uber' },
		{ pid: 'P4', uid: 'kufOdxpbNXZMPpelY92XJaIMIGg1', platform: 'rover' },
		{ pid: 'D6', uid: '5OtednyCKaVBxXcrVLAJBjcmD3S2', platform: 'uber' },
		{ pid: 'D7', uid: 'RW5Na1bhg0bcuGLoyeWgfQD6pQv1', platform: 'uber' },
		{ pid: 'D8', uid: 'iJv3viJRY4UBTRHBTgvpLOy1haY2', platform: 'uber' },
		{ pid: 'D9', uid: 'gJg2PGAmynMqTVUSYgpicDASUJF2', platform: 'uber' },
		{ pid: 'P5', uid: 'At5VOeK8hWNynglrdQRqntrb4O13', platform: 'rover' },
		{ pid: 'P3', uid: 'yLqlH9AUAyeGIC4He3kjlh9iVOY2', platform: 'rover' }
	];

	const stats = [
		{
			pid: 'ID',
			stories: 'Stories',
            liked: 'Liked Stories',
			incomes: 'Incomes',
			expenses: 'Expenses',
			trends: 'Trends Visits'
		}
	];
    const posts = [];
    for (const platform of ['uber', 'rover', 'upwork']) {
        const snapshot = await getDocs(query(collection(db, 'stories', platform, 'posts')));
        snapshot.forEach(doc => {
            posts.push({likes: doc.data().likes})
        });
    }

	for (const item of testers) {
		const stories = await getDocs(
			query(collection(db, 'stories', item.platform, 'posts'), where('uid', '==', item.uid))
		);

        let liked = 0;
        posts.forEach((doc) => {
			const likes = doc.likes;
			if (likes.includes(item.uid))
				liked++
		});

        // console.log(posts.length)

		const expenses = await getDocs(
			query(collection(db, 'upload', 'expenses', item.platform), where('uid', '==', item.uid))
		);

		const trends = await getDocs(query(collection(db, 'logging', 'trends_visits', item.uid)));

		let incomeEntries;
		let incomeCount = 0;

		switch (item.platform) {
			case 'rover':
			case 'upwork':
				incomeEntries = await getDocs(
					query(collection(db, 'upload', 'manual', item.platform), where('uid', '==', item.uid))
				);
				incomeCount += incomeEntries.docs.length;
				break;
			case 'uber':
				for (const entryType of ['quests', 'trips']) {
					incomeEntries = await getDocs(
						query(collection(db, 'upload', 'manual', entryType), where('uid', '==', item.uid))
					);
					incomeCount += incomeEntries.docs.length;
				}
				break;
		}

		stats.push({
			pid: item.pid,
			stories: stories.docs.length.toString(),
            liked: liked.toString(),
			expenses: expenses.docs.length.toString(),
			incomes: incomeCount.toString(),
			trends: trends.docs.length.toString()
		});
	}

	// Calculate averages and append the "Average" row
	const averages = stats.slice(1).reduce(
		(acc, stat) => {
			acc.stories += parseFloat(stat.stories) || 0;
            acc.liked += parseFloat(stat.liked) || 0;
			acc.incomes += parseFloat(stat.incomes) || 0;
			acc.expenses += parseFloat(stat.expenses) || 0;
			acc.trends += parseFloat(stat.trends) || 0;
			acc.count += 1;
			return acc;
		},
		{ stories: 0,liked:0, incomes: 0, expenses: 0, trends: 0, count: 0 }
	);

	if (averages.count > 0) {
		stats.push({
			pid: 'Average',
			stories: (averages.stories / averages.count).toFixed(2),
            liked:(averages.stories / averages.count).toFixed(2),
			incomes: (averages.incomes / averages.count).toFixed(2),
			expenses: (averages.expenses / averages.count).toFixed(2),
			trends: (averages.trends / averages.count).toFixed(2)
		});
	}

	// console.log(stats); // This will now log the updated stats

	return {
		stats: stats
	};
}
