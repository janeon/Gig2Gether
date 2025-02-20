export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
/** Time-based calculations **/

export function getHoursDifference(time1, time2) {
	if (!time1 || !time2) return 0;
	const [h1, m1] = time1.split(':').map(Number);
	const [h2, m2] = time2.split(':').map(Number);
	// Calculate the difference in minutes
	let differenceInMinutes = h2 * 60 + m2 - (h1 * 60 + m1);

	// If the difference is negative, add 24 * 60 (one full day in minutes)
	if (differenceInMinutes < 0) {
		differenceInMinutes += 24 * 60;
	}

	// Convert minutes difference to hours
	return differenceInMinutes / 60;
}

export function calculateHourlyRates(
	timeFrames: string[],
	workSessions: { startTime: string; endTime: string; rate: number }[]
) {
	// console.log(timeFrames, workSessions)
	// Initialize results for each time frame
	const results: Record<
		string,
		{ totalEarnings: number; totalHours: number; averageRate?: number }
	> = timeFrames.reduce(
		(acc, frame) => {
			acc[frame] = { totalEarnings: 0, totalHours: 0 };
			return acc;
		},
		{} as Record<string, { totalEarnings: number; totalHours: number; averageRate?: number }>
	);

	// Convert time string to total minutes from midnight
	const parseTime = (timeString: string) => {
		const timeMatch = timeString.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
		if (!timeMatch) throw new Error(`Invalid time format: ${timeString}`);

		const [, h, m = '00', period] = timeMatch;
		let hour = parseInt(h, 10);
		const minute = parseInt(m, 10);
		if (period) {
			if (period.toLowerCase() === 'pm' && hour < 12) hour += 12;
			if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
		} else if (hour === 12) hour = 0;
		return { hour, minute };
	};

	// Convert to minutes from midnight
	const timeToMinutes = ({ hour, minute }: { hour: number; minute: number }) => hour * 60 + minute;

	// Define time frames in minutes
	const getFrameBoundaries = (frames: string[]): Record<string, [number, number]> => {
		return frames.reduce(
			(acc, frame) => {
				const [startTime, endTime] = frame.split('-').map((t) => t.trim());
				acc[frame] = [timeToMinutes(parseTime(startTime)), timeToMinutes(parseTime(endTime))];
				return acc;
			},
			{} as Record<string, [number, number]>
		);
	};

	const frameBoundaries = getFrameBoundaries(timeFrames);

	// Calculate hours worked in each time frame
	workSessions.forEach(({ startTime, endTime, rate }) => {
		const start = timeToMinutes(parseTime(startTime));
		let end = timeToMinutes(parseTime(endTime));
		if (end < start) end += 1440; // Adjust for crossing midnight

		Object.entries(frameBoundaries).forEach(([frame, [frameStart, frameEnd]]) => {
			if (end > frameStart && start < frameEnd) {
				const effectiveStart = Math.max(start, frameStart);
				const effectiveEnd = Math.min(end, frameEnd);
				const hoursWorked = (effectiveEnd - effectiveStart) / 60;
				const earnings = hoursWorked * rate;

				results[frame].totalEarnings += earnings;
				results[frame].totalHours += hoursWorked;
			}
		});
	});

	// Calculate average hourly rates for each time frame
	for (const frame in results) {
		const { totalEarnings, totalHours } = results[frame];
		results[frame].averageRate = totalHours > 0 ? totalEarnings / totalHours : 0;
	}

	return results;
}

export function calculateMissingTime(
	startTime: string | null,
	endTime: string | null,
	hoursBetween: number
): string {
	const toMinutes = (time: string) => {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	};

	const toTimeString = (mins: number) =>
		`${Math.floor(mins / 60)}:${(mins % 60).toString().padStart(2, '0')}`;

	const totalMinutes = hoursBetween * 60;

	return startTime
		? toTimeString(toMinutes(startTime) + totalMinutes)
		: toTimeString(toMinutes(endTime!) - totalMinutes);
}

export function transformHourlyData(data: {
	[key: string]: { totalEarnings: number; totalHours: number; averageRate: number };
}): { x: string; y: number }[] {
	// Map the data to the desired format with truncated averageRate
	return Object.entries(data).map(([key, value]) => ({
		x: key,
		y: parseFloat(value.averageRate.toFixed(2)) // truncate averageRate to 2 decimals
	}));
}