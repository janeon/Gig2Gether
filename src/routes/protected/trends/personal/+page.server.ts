import { db } from '$lib/firebase/client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getHoursDifference } from '$lib/utils';

function calculateHourlyRates(
    timeFrames: string[],
    workSessions: { startTime: string; endTime: string; rate: number }[]
) {
    // Initialize results for each time frame
    const results: Record<string, { totalEarnings: number; totalHours: number; averageRate?: number }> = timeFrames.reduce((acc, frame) => {
        acc[frame] = { totalEarnings: 0, totalHours: 0 };
        return acc;
    }, {} as Record<string, { totalEarnings: number; totalHours: number; averageRate?: number }>);

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
        return frames.reduce((acc, frame) => {
            const [startTime, endTime] = frame.split('-').map(t => t.trim());
            acc[frame] = [timeToMinutes(parseTime(startTime)), timeToMinutes(parseTime(endTime))];
            return acc;
        }, {} as Record<string, [number, number]>);
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



export async function load() {
    const snapshot = await getDocs(
        query(collection(db,"upload", "manual", "rover"), orderBy('startTime', 'asc'))
    );
    const workSessions = [];
    snapshot.forEach(async (item) => {
        const hoursWorked = getHoursDifference(item.data().startTime, item.data().endTime);
        if (item.data().cutIncome) {
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().cutIncome / hoursWorked).toFixed(2)
            });
        }
        else if (item.data().income) {
            // assume 20% cut for now on rover
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().income * .8 / hoursWorked).toFixed(2)
            });
        }
        else if (item.data().rate) { // this never happens the way error checking works rn
            // again assume 20% cut for rover
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().rate*.8).toFixed(2)
                // assuming hourly rate
            });
        }
    });
    const hourlyRates = calculateHourlyRates(['12-4am', '4-8am', '8am-12pm', '12-4pm', '4-8pm', '8pm-12am'], workSessions);
    function transformData(data: { [key: string]: { totalEarnings: number; totalHours: number; averageRate: number } }): { x: string; y: number }[] {
        // Map the data to the desired format with truncated averageRate
        return Object.entries(data).map(([key, value]) => ({
          x: key,
          y: parseFloat(value.averageRate.toFixed(2)) // truncate averageRate to 2 decimals
        }));
      }
    
    return {
		workSegments: transformData(hourlyRates)
	};
}