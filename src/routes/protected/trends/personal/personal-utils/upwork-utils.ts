import { weekdays, getHoursDifference } from './trends-utils';

export function getUpworkWeeklyData(snapshot, uid) {
	const calEarnings = [];
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const weekdayHours = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const dailyHours = {}; // To track total hours worked per day

	// Loop through the snapshot and process each item
	snapshot.forEach((item) => {
		const data = item.data();
		if (data.uid !== uid) return;

		// Ensure endDate exists
		if (!data.endDate) {
			data.endDate = data.startDate; // Assume endDate = startDate if missing
		}

		// Calculate hours worked
		let hoursWorked = 0;
		if (getHoursDifference(data.startTime, data.endTime)) {
			hoursWorked = getHoursDifference(data.startTime, data.endTime);
		} else if (data.workUnits === 'Hours' || data.workUnits === 'Minutes') {
			hoursWorked = data.workUnits === 'Hours' ? data.unitsWorked : data.unitsWorked / 60;
		}
		if (data.hoursPerWeek) {
			hoursWorked = data.hoursPerWeek.hours;
		}

		// Add the hours worked to the respective day in the weekdayHours array
		const dayIndex = new Date(data.endDate).getDay();
		weekdayHours[dayIndex].y += hoursWorked;

		// Track hours worked for each specific day (by endDate)
		if (dailyHours[data.endDate]) {
			dailyHours[data.endDate] += hoursWorked;
		} else {
			dailyHours[data.endDate] = hoursWorked;
		}

		// Update earnings based on available income data
		if (data.cutIncome) {
			const cutIncome = parseFloat(data.cutIncome);
			weekdayEarnings[dayIndex].y += cutIncome;
			calEarnings.push({ date: data.endDate, value: cutIncome });
		} else if (data.fixedCharge) {
			const fixed = parseFloat(data.fixedCharge);
			weekdayEarnings[dayIndex].y += fixed;
			calEarnings.push({ date: data.endDate, value: fixed });
		} else if (data.hourlyCharge && data.hoursPerWeek) {
			const totalEarnings = data.hourlyCharge * data.hoursPerWeek;
			weekdayEarnings[dayIndex].y += totalEarnings;
			calEarnings.push({
				date: data.endDate,
				value: totalEarnings
			});
		}
	});

	// Calculate total earnings and total hours
	let totalEarnings = 0;
	let totalHours = 0;

	weekdayEarnings.forEach((entry, index) => {
		if (weekdayHours[index].y) {
			totalEarnings += entry.y;
			totalHours += weekdayHours[index].y;
			entry.y = entry.y / weekdayHours[index].y; // Calculate earnings
		}
		entry.x = entry.x.slice(0, 3); // Shorten to 'Mon', 'Tue', etc.
	});
	// Calculate average hours per day
	const uniqueDaysCount = Object.keys(dailyHours).length;
	const totalDailyHours = Object.values(dailyHours).reduce(
		(sum, hours) => parseFloat(sum) + parseFloat(hours),
		0
	);
	const averageHoursPerDay = uniqueDaysCount > 0 ? totalDailyHours / uniqueDaysCount : 0;

	return {
		weekdayEarnings: weekdayEarnings,
		averageEarningsPerHour: totalHours > 0 ? totalEarnings / totalHours : 0,
		averageHoursPerDay: averageHoursPerDay,
		calEarnings: calEarnings
	};
}