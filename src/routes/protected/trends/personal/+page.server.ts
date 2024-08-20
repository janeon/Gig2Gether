import { db } from '$lib/firebase/client';
import { collection, getDocs, query } from 'firebase/firestore';
import { getHoursDifference, calculateHourlyRates, calculateMissingTime, transformHourlyData }  from '$lib/utils';

export async function load ({ locals }) {
    const snapshot = await getDocs(
        query(collection(db,"upload", "manual", locals.user.platform))
    );
    let workSegments = [];
    let weeklyEarnings = [];
    let averageEarningsPerHour = 0;
    switch (locals.user.platform) {
        case 'rover':
            { workSegments = getRoverHourlyData(snapshot, locals.user.uid).workSegments;
            const roverWeekly = getRoverWeeklyData(snapshot, locals.user.uid);
            weeklyEarnings = roverWeekly.weekdayEarnings;
            averageEarningsPerHour = roverWeekly.averageEarningsPerHour;
            return { workSegments, weeklyEarnings, averageEarningsPerHour }; }
        case 'upwork': {
            const upworkWeekly = getUpworkWeeklyData(snapshot, locals.user.uid);
            weeklyEarnings = upworkWeekly.weekdayEarnings;
            averageEarningsPerHour = upworkWeekly.averageEarningsPerHour;
            return { workSegments, weeklyEarnings, averageEarningsPerHour };
        }
        default:
            return {
                workSegments: workSegments, // this is the default return value for rover
                weeklyEarnings: weeklyEarnings, // this is the default return value for upwork
                averageEarningsPerHour: averageEarningsPerHour
            };
    }

}

function getUpworkWeeklyData(snapshot, uid) {
    const weekdayEarnings = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ x: day, y: 0.0 }));
    const weekdayHours = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ x: day, y: 0.0 }));
    snapshot.forEach(async (item) => {
        if (item.data().uid !== uid) {
            return;
        }
        if (!item.data().startDate && !item.data().endDate) {
            return {} ;
        }
        else if (!item.data().endDate) { // this should never happen, but I'm paranoid
            item.data().endDate = item.data().startDate;
        }
        let hoursWorked;
        if (getHoursDifference(item.data().startTime, item.data().endTime)) {
            hoursWorked = getHoursDifference(item.data().startTime, item.data().endTime);
        }
        else if ((item.data().workUnits === "Hours" || item.data().workUnits === "Minutes")) {
            hoursWorked = item.data().workUnits === "Hours"
            ? item.data().unitsWorked
            : item.data().unitsWorked / 60;
        }
        if (item.data().hoursPerWeek) 
            hoursWorked = item.data().hoursPerWeek.hours;      
        // console.log(hoursWorked);  
        
        const dayIndex = new Date(item.data().endDate).getDay();
        weekdayHours[dayIndex].y += hoursWorked;
        if (item.data().cutIncome) {
            weekdayEarnings[dayIndex].y += item.data().cutIncome as number;
        }
        else if (item.data().fixedCharge) {
            weekdayEarnings[dayIndex].y += item.data().fixedCharge as number;
        }
        else if (item.data().hourlyCharge && item.data().hoursPerWeek) {
            weekdayEarnings[dayIndex].y += item.data().hourlyCharge * item.data().hoursPerWeek;
        }
        else {
            // do not have monthly earnings for this item
            return {} ;
        }
    });

    let totalEarnings = 0;
    let totalHours = 0;
    // divide each earning entry by hours worked to get hourly rate
    weekdayEarnings.forEach((entry, index) => {
        if (weekdayHours[index].y) {
            totalEarnings += entry.y;
            totalHours += weekdayHours[index].y;
            entry.y = (entry.y / weekdayHours[index].y);
        }
        entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
    });

    return {
        weekdayEarnings : weekdayEarnings,
        averageEarningsPerHour : totalHours > 0 ? totalEarnings / totalHours : 0
    }
}

function getRoverHourlyData(snapshot, uid) {
    const workSessions = [];
    snapshot.forEach(async (item) => {
        if (item.data().uid !== uid) {
            return;
        }
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

function getRoverWeeklyData(snapshot, uid) {
    const weekdayEarnings = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ x: day, y: 0.0 }));
    const weekdayHours = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({ x: day, y: 0.0 }));
    snapshot.forEach(async (item) => {
        // error checking
        if (item.data().uid !== uid) {
            return;
        }
        if (!item.data().startDate && !item.data().endDate) {
            return {} ;
        }
        else if (!item.data().endDate) { // this should never happen, but I'm paranoid
            item.data().endDate = item.data().startDate;
        }
        // getting ours worked
        let hoursWorked;
        if (getHoursDifference(item.data().startTime, item.data().endTime)) {
            hoursWorked = getHoursDifference(item.data().startTime, item.data().endTime) as number;
        }
        else if ((item.data().workUnits === "Hours" || item.data().workUnits === "Minutes")) {
            hoursWorked = item.data().workUnits === "Hours"
            ? item.data().unitsWorked as number
            : item.data().unitsWorked / 60;
        }
        if (item.data().hoursPerWeek) 
            hoursWorked = item.data().hoursPerWeek.hours as number;      
        // console.log(hoursWorked);  
        
        // getting day of the week
        const dayIndex = new Date(item.data().endDate).getDay();
        
        // adding hours worked to total hours worked for that day
        weekdayHours[dayIndex].y += hoursWorked;
        
        // adding earnings to total earnings for that day across weeks
        if (item.data().cutIncome) {
            weekdayEarnings[dayIndex].y += item.data().cutIncome as number;
        }
        else if (item.data().income) {
            weekdayEarnings[dayIndex].y += item.data().income as number;
        }
        else if (item.data().rate && item.data().unitsWorked) {
            weekdayEarnings[dayIndex].y += item.data().rate * item.data().unitsWorked as number;
        }
        else {
            // do not have monthly earnings for this item
            return {} ;
        }
    });

    let totalEarnings = 0;
    let totalHours = 0;

    // divide each earning entry by hours worked to get hourly rate
    weekdayEarnings.forEach((entry, index) => {
        if (weekdayHours[index].y) {
            totalEarnings += entry.y;
            totalHours += weekdayHours[index].y;
            entry.y = (entry.y / weekdayHours[index].y);
        }
        entry.x = entry.x.slice(0, 3); // Shortens to 'Mon', 'Tue', etc.
    });

    // console.log(totalEarnings, totalHours, weekdayHours);

    return {
        weekdayEarnings : weekdayEarnings,
        averageEarningsPerHour : totalHours > 0 ? totalEarnings / totalHours : 0
    }
}