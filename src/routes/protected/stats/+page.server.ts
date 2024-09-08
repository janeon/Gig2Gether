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

	const participant_stats = [
		{
			pid: 'ID',
			stories: 'Stories',
			totalWords: 'Total Words',
			liked: 'Liked Stories',
			incomes: 'Incomes',
			expenses: 'Expenses',
			trends: 'Trends Visits'
		}
	];

	const posts = [];

	for (const platform of ['uber', 'rover', 'upwork']) {
		const snapshot = await getDocs(query(collection(db, 'stories', platform, 'posts')));
		snapshot.forEach((doc) => {
			const data = doc.data();
			if (testers.some((item) => item.uid === data.uid)) {
				posts.push({
					likes: data.likes,
					tags: data.tags,
					type: data.type,
					uid: data.uid
				});
			}
		});
	}

	// story stats
	const issue_tags = {};
	const strategy_tags = {};
	const types = { issue: 0, strategy: 0 };
	for (const post of posts) {
		types[post.type] += 1;
		for (const tag of post.tags) {
			if (post.type == 'issue') {
				issue_tags[tag] = issue_tags[tag] ? issue_tags[tag] + 1 : 1;
			} else {
				strategy_tags[tag] = strategy_tags[tag] ? strategy_tags[tag] + 1 : 1;
			}
		}
	}
	const tags = {};
	for (const tag of Object.keys(issue_tags)) {
		tags[tag] = {
			issues: issue_tags[tag],
			strategies: strategy_tags[tag] ? strategy_tags[tag] : 0
		};
	}
	for (const tag of Object.keys(strategy_tags)) {
		if (!tags[tag]) {
			tags[tag] = { issues: 0, strategies: strategy_tags[tag] };
		}
	}
	const expenseFields = {};
	const upworkIncomeFields = {};
	const roverIncomeFields = {};
	const uberIncomeFields = {};
	const upworkFields = ['clientHistory', 'experience', 'notes', 'workUnits'];
	const upworkInitials = {'clientHistory':'', 'experience':[], 'notes':'', 'workUnits': 'Hours'};
	const roverFields = [ 'notes', 'workUnits'];;
	const roverInitials = { 'notes':'', 'workUnits': 'Hours'};
	for (const item of testers) {
		const stories = await getDocs(
			query(collection(db, 'stories', item.platform, 'posts'), where('uid', '==', item.uid))
		);
		let totalWords = 0;
		stories.forEach((doc) => {
			totalWords += doc.data().description.trim().split(/\s+/).length;
		});

		let liked = 0;
		posts.forEach((doc) => {
			const likes = doc.likes;
			if (likes.includes(item.uid)) liked++;
		});

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
				for (const income of incomeEntries.docs) {
					const data = income.data()
					for (const field in data) {
						if ((item.platform == 'rover' ? roverFields : upworkFields).includes(field)) {
							if (item.platform == 'rover') {
								if (roverInitials[field] !== data[field])
									roverIncomeFields[field] = roverIncomeFields[field] ? roverIncomeFields[field] + 1 : 1;
							}
							else {
								if (upworkInitials[field] !== data[field])
									upworkIncomeFields[field] = upworkIncomeFields[field] ? upworkIncomeFields[field] + 1 : 1;
							}
						}
					}
				}
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

		for (const expense of expenses.docs) {
			const data = expense.data();
			for (const key in data) {
				if (!['date', 'amount', 'uid', 'timestamp', 'time'].includes(key)) {
					switch (key) {
						case 'url':
							if (data[key]) expenseFields[key] = expenseFields[key] ? expenseFields[key] + 1 : 1;
							break;
						case 'expenseType':
							if (data[key].length)
								expenseFields[key] = expenseFields[key] ? expenseFields[key] + 1 : 1;
							break;
						case 'description':
							if (data[key] !== '')
								expenseFields[key] = expenseFields[key] ? expenseFields[key] + 1 : 1;
							break;
					}
				}
			}
		}

		// console.log(roverIncomeFields)
		// console.log(upworkIncomeFields)

		participant_stats.push({
			pid: item.pid,
			stories: stories.docs.length.toString(),
			totalWords: totalWords.toString(),
			liked: liked.toString(),
			expenses: expenses.docs.length.toString(),
			incomes: incomeCount.toString(),
			trends: trends.docs.length.toString()
		});
	}

	// console.log(expenseFields)
	// console.log(tags);
	return {
		stats: participant_stats,
		types: types,
		tags: tags,
		expenseFields: expenseFields
	};
}
