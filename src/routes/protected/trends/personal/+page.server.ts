import { db } from '$lib/firebase/client';
import { collection, getDocs, query } from 'firebase/firestore';
import { getHoursDifference, calculateHourlyRates, calculateMissingTime, transformHourlyData, monthMap }  from '$lib/utils';

export async function load ({ locals }) {
    const snapshot = await getDocs(
        query(collection(db,"upload", "manual", locals.user.platform))
    );
    switch (locals.user.platform) {
        case 'rover':
            return getRoverData(snapshot);
        case 'upwork':
            return getUpworkData(snapshot);
        default:
            return {
                workSegments: [],
                monthlySegments: []
            };
    }

}

function getUpworkData(snapshot) {
    const monthlyEarnings = Object.values(monthMap).map(month => ({ x: month, y: 0.0 }));
    snapshot.forEach(async (item) => {
        if (!item.data().startDate && !item.data().endDate) {
            return;
        }
        let endDate = item.data().endDate;
        if (!endDate) { // this should never happen, but I'm paranoid
            endDate = item.data().startDate;
        }
        const monthIndex = parseInt(endDate.slice(5, 7), 10) - 1;
        if (item.data().fixedCharge) 
            monthlyEarnings[monthIndex].y += item.data().fixedCharge;
        else if (item.data().hourlyCharge && item.data().hoursPerWeek.hours) {
            monthlyEarnings[monthIndex].y += item.data().hourlyCharge * item.data().hoursPerWeek.hours;
        }
        else {
            // do not have monthly earnings for this item
            return;
        }
    });
    return {
        monthlyEarnings : monthlyEarnings
    }
}

function getRoverData(snapshot) {
    const workSessions = [];
    snapshot.forEach(async (item) => {
        const hoursWorked = getHoursDifference(item.data().startTime, item.data().endTime) || item.data().unitsWorked;
        if (!item.data().startTime || !item.data().endTime) {
            if (!item.data().startTime && !item.data().endTime) {
                return;
            }
            const missingTime = calculateMissingTime(item.data().startTime, item.data().endTime, hoursWorked);
            if (item.data().startTime === null) {
                item.data().startTime = missingTime;
            }
            else {
                item.data().endTime = missingTime;
            }
        }
        if (item.data().cutIncome) {
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().cutIncome / hoursWorked).toFixed(2)
            });
        }
        else if (item.data().income) {
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().income * .8 / hoursWorked).toFixed(2)
            });
        }
        else if (item.data().rate) { // this should never happen the way error checking works rn
            workSessions.push({
                startTime: item.data().startTime,
                endTime: item.data().endTime,
                rate: (item.data().rate*.8).toFixed(2)
            });
        }
    });
    const hourlyRates = calculateHourlyRates(
        ['12-4am', '4-8am', '8am-12pm', '12-4pm', '4-8pm', '8pm-12am'], 
        workSessions);
    return {
		workSegments: transformHourlyData(hourlyRates)
	};
}