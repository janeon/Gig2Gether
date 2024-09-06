import { db } from '$lib/firebase/client';
import { collection, getDocs, query } from 'firebase/firestore';
import {
	getHoursDifference,
	calculateHourlyRates,
	calculateMissingTime,
	transformHourlyData
} from '$lib/utils';

const weekdays = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];
export async function load({ locals }) {
    const manualData = locals.user.platform === 'uber' ? 'trips' : locals.user.platform;
	const earnings = await getDocs(query(collection(db, 'upload', 'manual', manualData)));
	const expenses = await getDocs(query(collection(db, 'upload', 'expenses', locals.user.platform)));
	let workSegments = [];
	let weeklyEarnings = [];
	let averageEarningsPerHour = 0;
	let averageHoursPerWeek = 0;
	let calEarnings = [];
	let calExpenses = [];
	locals.user.uid = "Y5M2Yhj4IvRiNJB3UYm48Wi3sk73"
	switch (locals.user.platform) {
		case 'rover': {
			workSegments = getRoverHourlyData(earnings, locals.user.uid).workSegments;
			const roverWeekly = getRoverWeeklyData(earnings, locals.user.uid);
			weeklyEarnings = roverWeekly.weekdayEarnings;
			averageEarningsPerHour = roverWeekly.averageEarningsPerHour;
			calEarnings = roverWeekly.calEarnings;
			break;
		}
		case 'upwork': {
			const upworkWeekly = getUpworkWeeklyData(earnings, locals.user.uid);
			weeklyEarnings = upworkWeekly.weekdayEarnings;
			averageEarningsPerHour = upworkWeekly.averageEarningsPerHour;
			calEarnings = upworkWeekly.calEarnings;
			break;
		}
		case 'uber': {
            const uberWeekly = getUberWeeklyData(earnings, locals.user.uid);
			weeklyEarnings = uberWeekly.weekdayEarnings;
			calEarnings = uberWeekly.calEarnings;
			break;
		}
	}
	calExpenses = getExpenses(expenses, locals.user.uid);
	return {
		workSegments: workSegments, // this is the default return value for rover
		weeklyEarnings: weeklyEarnings, // this is the default return value for upwork
		averageHoursPerWeek:averageHoursPerWeek,
		averageEarningsPerHour: averageEarningsPerHour,
		calEarnings: calEarnings,
		calExpenses: calExpenses
	};
}

function getUpworkWeeklyData(snapshot, uid) {
	const calEarnings = [];
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const weekdayHours = weekdays.map((day) => ({ x: day, y: 0.0 }));
	snapshot.forEach(async (item) => {
		if (item.data().uid !== uid) {
			return;
		}
		else if (!item.data().endDate) {
			// this should never happen, but I'm paranoid
			item.data().endDate = item.data().startDate;
		}
		let hoursWorked;
		if (getHoursDifference(item.data().startTime, item.data().endTime)) {
			hoursWorked = getHoursDifference(item.data().startTime, item.data().endTime);
		} else if (item.data().workUnits === 'Hours' || item.data().workUnits === 'Minutes') {
			hoursWorked =
				item.data().workUnits === 'Hours' ? item.data().unitsWorked : item.data().unitsWorked / 60;
		}
		if (item.data().hoursPerWeek) {
			hoursWorked = item.data().hoursPerWeek.hours;
		}
			
		// console.log(weekdayEarnings);

		const dayIndex = new Date(item.data().endDate).getDay();
		weekdayHours[dayIndex].y += hoursWorked;
		if (item.data().cutIncome) {
			weekdayEarnings[dayIndex].y += parseFloat(item.data().cutIncome);
			calEarnings.push({ date: item.data().endDate, value: parseFloat(item.data().cutIncome) });
		} else if (item.data().fixedCharge) {
			weekdayEarnings[dayIndex].y += parseFloat(item.data().fixedCharge);
			calEarnings.push({ date: item.data().endDate, value: parseFloat(item.data().fixedCharge)});
		} else if (item.data().hourlyCharge && item.data().hoursPerWeek) {
			weekdayEarnings[dayIndex].y += item.data().hourlyCharge * item.data().hoursPerWeek;
			calEarnings.push({
				date: item.data().endDate,
				value: item.data().hourlyCharge * item.data().hoursPerWeek
			});
		} else {
			// do not have monthly earnings for this item
			console.log("could not build monthly earnings")
			return {};
		}
	});

	let totalEarnings = 0;
	let totalHours = 0;
	// divide each earning entry by hours worked to get hourly rate
	weekdayEarnings.forEach((entry, index) => {
		if (weekdayHours[index].y) {
			totalEarnings += entry.y;
			totalHours += weekdayHours[index].y;
			entry.y = entry.y / weekdayHours[index].y;
		}
		entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
	});

	return {
		weekdayEarnings: weekdayEarnings,
		averageEarningsPerHour: totalHours > 0 ? totalEarnings / totalHours : 0,
		calEarnings: calEarnings
	};
}

function getRoverHourlyData(snapshot, uid) {
	const workSessions = [];
	snapshot.forEach(async (item) => {
		if (item.data().uid !== uid) {
			return;
		}
		const hoursWorked =
			getHoursDifference(item.data().startTime, item.data().endTime) || item.data().unitsWorked;
		if (!item.data().startTime || !item.data().endTime) {
			if (!item.data().startTime && !item.data().endTime) {
				return;
			}
			const missingTime = calculateMissingTime(
				item.data().startTime,
				item.data().endTime,
				hoursWorked
			);
			if (item.data().startTime === null) {
				item.data().startTime = missingTime;
			} else {
				item.data().endTime = missingTime;
			}
		}
		if (item.data().cutIncome) {
			workSessions.push({
				startTime: item.data().startTime,
				endTime: item.data().endTime,
				rate: (item.data().cutIncome / hoursWorked).toFixed(2)
			});
		} else if (item.data().income) {
			workSessions.push({
				startTime: item.data().startTime,
				endTime: item.data().endTime,
				rate: ((item.data().income * 0.8) / hoursWorked).toFixed(2)
			});
		} else if (item.data().rate) {
			// this should never happen the way error checking works rn
			workSessions.push({
				startTime: item.data().startTime,
				endTime: item.data().endTime,
				rate: (item.data().rate * 0.8).toFixed(2)
			});
		}
	});
	const hourlyRates = calculateHourlyRates(
		['12-4am', '4-8am', '8am-12pm', '12-4pm', '4-8pm', '8pm-12am'],
		workSessions
	);
	return {
		workSegments: transformHourlyData(hourlyRates)
	};
}

function getRoverWeeklyData(snapshot, uid) {
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const weekdayHours = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const calEarnings = [];

	// console.log("getting rover weekly data");
	snapshot.forEach(async (item) => {
		// error checking
		if (item.data().uid !== uid) {
			return;
		}
		if (!item.data().startDate && !item.data().endDate) {
			return {};
		} else if (!item.data().endDate) {
			// this should never happen, but I'm paranoid
			item.data().endDate = item.data().startDate;
		}
		// getting ours worked
		let hoursWorked;
		if (getHoursDifference(item.data().startTime, item.data().endTime)) {
			hoursWorked = getHoursDifference(item.data().startTime, parseFloat(item.data().endTime));
		} else if (item.data().workUnits === 'Hours' || item.data().workUnits === 'Minutes') {
			hoursWorked =
				item.data().workUnits === 'Hours'
					? (parseFloat(item.data().unitsWorked))
					: item.data().unitsWorked / 60;
		}
		if (item.data().hoursPerWeek) hoursWorked = parseFloat(item.data().hoursPerWeek.hours);
		// console.log(hoursWorked);

		// getting day of the week
		const dayIndex = new Date(item.data().endDate).getDay();
		// console.log(dayIndex, "day index", weekdays[dayIndex]);
		// adding hours worked to total hours worked for that day
		weekdayHours[dayIndex].y += hoursWorked;

		// adding earnings to total earnings for that day across weeks
		if (item.data().cutIncome) {
			weekdayEarnings[dayIndex].y += parseFloat(item.data().cutIncome);
			calEarnings.push({ date: item.data().endDate, value: parseFloat(item.data().cutIncome) });
		} else if (item.data().income) {
			weekdayEarnings[dayIndex].y += parseFloat(item.data().income);
			calEarnings.push({ date: item.data().endDate, value: parseFloat(item.data().income) });
		} else if (item.data().rate && item.data().unitsWorked) {
			weekdayEarnings[dayIndex].y += (item.data().rate * parseFloat(item.data().unitsWorked));
			calEarnings.push({
				date: item.data().endDate,
				value: item.data().rate * item.data().unitsWorked
			});
		} else if (item.data().rate && hoursWorked) {
			weekdayEarnings[dayIndex].y += item.data().rate * hoursWorked;
			calEarnings.push({
				date: item.data().endDate,
				value: item.data().rate * hoursWorked
			});
		} else {
			// do not have monthly earnings for this item
			return {};
		}
	});

	let totalEarnings = 0;
	let totalHours = 0;

	// divide each earning entry by hours worked to get hourly rate
	weekdayEarnings.forEach((entry, index) => {
		if (weekdayHours[index].y) {
			totalEarnings += entry.y;
			totalHours += weekdayHours[index].y;
			entry.y = entry.y / weekdayHours[index].y;
		}
		entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
	});

	// console.log(totalEarnings, totalHours, weekdayHours);

	return {
		weekdayEarnings: weekdayEarnings,
		averageEarningsPerHour: totalHours > 0 ? totalEarnings / totalHours : 0,
		calEarnings: calEarnings
	};
}

function getUberWeeklyData(snapshot, uid) {
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
    const calEarnings = [];

	snapshot.forEach(async (item) => {
		if (item.data().uid !== uid) {
			return;
		}
        // getting day of the week
		const dayIndex = new Date(item.data().date).getDay();

		// adding hours worked to total hours worked for that day
		weekdayEarnings[dayIndex].y += item.data().fare;
        calEarnings.push({
            date: item.data().date,
            value: item.data().fare
        });
	});
    weekdayEarnings.forEach((entry) => {
		entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
	});
    return {
        weekdayEarnings: weekdayEarnings,
		calEarnings: calEarnings
    }
}

function getExpenses(snapshot, uid) {
	const expenses = [];
	snapshot.forEach(async (item) => {
		if (item.data().uid !== uid) {
			return;
		}
		if (item.data().amount) {
			expenses.push({
				date: item.data().date,
				value: item.data().amount
			});
		}
	});
	return expenses;
}
