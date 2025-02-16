import {
	weekdays,
	getHoursDifference,
	calculateHourlyRates,
	calculateMissingTime,
	transformHourlyData
} from '../trends-utils';

export function getRoverHourlyData(snapshot, uid) {
	const workSessions = [];
	snapshot.forEach(async (item) => {
		const data = item.data();
		if (data.uid !== uid) {
			return;
		}
		const hoursWorked = getHoursDifference(data.startTime, data.endTime) || data.unitsWorked;
		if (!data.startTime || !data.endTime) {
			if (!data.startTime && !data.endTime) {
				return;
			}
			const missingTime = calculateMissingTime(data.startTime, data.endTime, hoursWorked);
			if (data.startTime === null) {
				data.startTime = missingTime;
			} else {
				data.endTime = missingTime;
			}
		}
		if (data.cutIncome) {
			workSessions.push({
				startTime: data.startTime,
				endTime: data.endTime,
				rate: (data.cutIncome / hoursWorked).toFixed(2)
			});
		} else if (data.income) {
			workSessions.push({
				startTime: data.startTime,
				endTime: data.endTime,
				rate: ((data.income * 0.8) / hoursWorked).toFixed(2)
			});
		} else if (data.rate) {
			// this should never happen the way error checking works rn
			workSessions.push({
				startTime: data.startTime,
				endTime: data.endTime,
				rate: (data.rate * 0.8).toFixed(2)
			});
		}
	});
	const hourlyRates = calculateHourlyRates(
		['12-4am', '4-8am', '8am-12pm', '12-4pm', '4-8pm', '8pm-12am'],
		workSessions
	);
	return { workSegments: transformHourlyData(hourlyRates) };
}

export function getRoverWeeklyData(snapshot, uid) {
	const weekdayEarnings = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const weekdayHours = weekdays.map((day) => ({ x: day, y: 0.0 }));
	const daysWorked = [];
	const calEarnings = [];

	// console.log("getting rover weekly data");
	snapshot.forEach(async (item) => {
		const data = item.data();
		// error checking
		if (data.uid !== uid) {
			return;
		} else if (!data.startDate && !data.endDate) {
			return {};
		} else if (!data.endDate) {
			// this should never happen, but I'm paranoid
			data.endDate = data.startDate;
		}
		// getting ours worked
		let hoursWorked;
		if (getHoursDifference(data.startTime, data.endTime)) {
			hoursWorked = getHoursDifference(data.startTime, data.endTime);
		} else if (data.workUnits === 'Hours' || data.workUnits === 'Minutes') {
			hoursWorked =
				data.workUnits === 'Hours' ? parseFloat(data.unitsWorked) : data.unitsWorked / 60;
		}
		if (data.hoursPerWeek) hoursWorked = parseFloat(data.hoursPerWeek.hours);
		// console.log(hoursWorked);

		// getting day of the week
		const dayIndex = new Date(data.endDate).getDay();
		// console.log(dayIndex, "day index", weekdays[dayIndex]);
		// adding hours worked to total hours worked for that day
		weekdayHours[dayIndex].y += hoursWorked;

		// adding earnings to total earnings for that day across weeks
		if (data.cutIncome) {
			weekdayEarnings[dayIndex].y += parseFloat(data.cutIncome);
			calEarnings.push({ date: data.endDate, value: parseFloat(data.cutIncome) });
			daysWorked.push(data.date);
		} else if (data.income) {
			weekdayEarnings[dayIndex].y += parseFloat(data.income);
			calEarnings.push({ date: data.endDate, value: parseFloat(data.income) });
			daysWorked.push(data.date);
		} else if (data.rate && data.unitsWorked) {
			weekdayEarnings[dayIndex].y += data.rate * parseFloat(data.unitsWorked);
			calEarnings.push({ date: data.endDate, value: data.rate * data.unitsWorked });
			daysWorked.push(data.date);
		} else if (data.rate && hoursWorked) {
			weekdayEarnings[dayIndex].y += data.rate * hoursWorked;
			calEarnings.push({ date: data.endDate, value: data.rate * hoursWorked });
			daysWorked.push(data.date);
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
		calEarnings: calEarnings,
		dailyHours: daysWorked.length > 0 ? totalHours / daysWorked.length : 0
	};
}
