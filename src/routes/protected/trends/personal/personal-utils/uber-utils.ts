import { weekdays, getHoursDifference } from "./trends-utils";

function calculateUberStats(dataList) {
	const totals = dataList.reduce(
		(acc, item) => {
			acc.totalHours += item.hoursWorked;
			acc.totalEarnings += item.earning;
			acc.totalDays += 1;

			return acc;
		},
		{ totalHours: 0, totalEarnings: 0, totalDays: 0 }
	);
	// console.log(totals)

	// Avoid division by zero
	const hourly = totals.totalHours > 0 ? totals.totalEarnings / totals.totalHours : 0;
	const hours = totals.totalDays > 0 ? totals.totalHours / totals.totalDays : 0;
	return { hourlyRate: hourly, hoursWorked: hours };
}

export function getUberWeeklyData(snapshot, uid) {
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const calEarnings = [];
	const hourlyEarnings = []
	snapshot.forEach(async (item) => {
		const data = item.data()
		if (data.uid !== uid) {
			return;
		}
		// date already ISO date string in YYYY-MM-DD, 
		// and time in formats HH:MM
		const timeWorked = getHoursDifference(data.time, data.endTime);
		if (timeWorked) {
			hourlyEarnings.push({
				date: data.date, 
				hoursWorked: timeWorked,
				earning: data.fare
			})
		}
		
		// getting day of the week
		const dayIndex = new Date(data.date).getDay();

		// adding earnings to total earnings on weekday
		weekdayEarnings[dayIndex].y += data.fare;
		calEarnings.push({
			date: data.date,
			value: data.fare
		});
	});
	weekdayEarnings.forEach((entry) => {
		entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
	});

	const stats = calculateUberStats(hourlyEarnings)
	
	return {
		weekdayEarnings: weekdayEarnings,
		calEarnings: calEarnings,
		hourly: stats.hourlyRate,
		dailyHours: stats.hoursWorked
	};
}
