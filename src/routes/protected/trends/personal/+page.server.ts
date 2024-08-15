import { db } from '$lib/firebase/client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getHoursDifference } from '$lib/utils';

function calculateHourlyRates(timeFrames, workSessions) {
    // Initialize results for each time frame
    const results = {
        '12-4am': { totalEarnings: 0, totalHours: 0 },
        '4-8am': { totalEarnings: 0, totalHours: 0 },
        '8am-12pm': { totalEarnings: 0, totalHours: 0 },
        '12-4pm': { totalEarnings: 0, totalHours: 0 },
        '4-8pm': { totalEarnings: 0, totalHours: 0 },
        '8pm-12am': { totalEarnings: 0, totalHours: 0 },
    };

    // Convert time string to Date object
    function parseTime(timeString) {
        const [hour, minute] = timeString.split(':').map(Number);
        return { hour, minute };
    }

    // Convert Date object to total minutes from midnight
    function timeToMinutes({ hour, minute }) {
        return hour * 60 + minute;
    }

    // Define time frames in minutes
    const frameBoundaries = {
        '12-4am': [0, 240],
        '4-8am': [240, 480],
        '8am-12pm': [480, 720],
        '12-4pm': [720, 960],
        '4-8pm': [960, 1200],
        '8pm-12am': [1200, 1440],
    };

    // Helper function to calculate time difference in minutes
    function timeDifference(start, end) {
        return (end - start) / 60;
    }

    // Iterate over each work session
    workSessions.forEach(({ startTime, endTime, rate }) => {
        const start = timeToMinutes(parseTime(startTime));
        let end = timeToMinutes(parseTime(endTime));
        if (end < start) end += 1440; // Adjust for crossing midnight

        // Iterate over each time frame
        for (const [frame, [frameStart, frameEnd]] of Object.entries(frameBoundaries)) {
            if (end > frameStart && start < frameEnd) {
                const effectiveStart = Math.max(start, frameStart);
                const effectiveEnd = Math.min(end, frameEnd);
                const hoursWorked = timeDifference(effectiveStart, effectiveEnd);
                const earnings = hoursWorked * rate;

                results[frame].totalEarnings += earnings;
                results[frame].totalHours += hoursWorked;
            }
        }
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