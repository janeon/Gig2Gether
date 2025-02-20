import { db } from '$lib/firebase/client';
import { collection, getDocs, query } from 'firebase/firestore';
import { getRoverWeeklyData, getRoverHourlyData } from './personal-utils/rover-utils';
import { getUberWeeklyData } from './personal-utils/uber-utils';
import { getUpworkWeeklyData } from './personal-utils/upwork-utils';

export async function load({ locals }) {
	const manualData = locals.user.platform === 'uber' ? 'trips' : locals.user.platform;
	const earnings = await getDocs(query(collection(db, 'upload', 'manual', manualData)));
	const expenses = await getDocs(query(collection(db, 'upload', 'expenses', locals.user.platform)));
	let workSegments = [];
	let weeklyEarnings = [];
	let averageEarningsPerHour = 0;
	let averageHoursPerDay = null;
	let calEarnings = [];
	let calExpenses = [];
	switch (locals.user.platform) {
		case 'rover': {
			const roverWeekly = getRoverWeeklyData(earnings, locals.user.uid);
			workSegments = getRoverHourlyData(earnings, locals.user.uid).workSegments;
			weeklyEarnings = roverWeekly.weekdayEarnings;
			averageEarningsPerHour = roverWeekly.averageEarningsPerHour;
			calEarnings = roverWeekly.calEarnings;
			averageHoursPerDay = roverWeekly.dailyHours;
			break;
		}
		case 'upwork': {
			const upworkWeekly = getUpworkWeeklyData(earnings, locals.user.uid);
			weeklyEarnings = upworkWeekly.weekdayEarnings;
			averageEarningsPerHour = upworkWeekly.averageEarningsPerHour;
			calEarnings = upworkWeekly.calEarnings;
			averageHoursPerDay = upworkWeekly.averageHoursPerDay;
			break;
		}
		case 'uber': {
			const uberWeekly = getUberWeeklyData(earnings, locals.user.uid);
			weeklyEarnings = uberWeekly.weekdayEarnings;
			calEarnings = uberWeekly.calEarnings;
			averageEarningsPerHour = uberWeekly.hourly;
			averageHoursPerDay = uberWeekly.dailyHours
			break;
		}
	}
	calExpenses = getExpenses(expenses, locals.user.uid);
	return {
		workSegments,
		weeklyEarnings,
		averageHoursPerDay,
		averageEarningsPerHour,
		calEarnings,
		calExpenses
	};	
}

function getExpenses(snapshot, uid) {
	const expenses = [];
	snapshot.forEach(async (item) => {
		const data = item.data()
		if (data.uid !== uid) {
			return;
		}
		if (data.amount) {
			expenses.push({
				date: data.date,
				value: data.amount
			});
		}
	});
	return expenses;
}
