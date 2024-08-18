import { currentDate, currentTime, extractAfterEquals } from '$lib/utils';
import type { RoverData, UpworkData } from '$lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function _cleanData(upworkData: UpworkData, roverData: RoverData, platform: string, initialData: any): { roverData: RoverData } | { upworkData: UpworkData } {
	if (platform === 'rover') {
		const roverMoneyFields = ['income', 'cutIncome', 'tips', 'rate'];
		roverMoneyFields.forEach((property) => {
			if (roverData[property] !== null) {
				roverData[property] = extractAfterEquals(roverData[property]);
			}
		});
		if (
			roverData.startTime === initialData.startTime &&
			roverData.endTime === initialData.endTime
		) {
			roverData.startTime = null;
			roverData.endTime = null;
		}
		return { roverData } ;
	}

	if (platform === 'upwork') {
		upworkData.hourlyCharge = extractAfterEquals(upworkData.hourlyCharge);
		if (upworkData.endDate === initialData.endDate && !upworkData.date) {
			upworkData.endDate = null;
		}
		if (
			upworkData.startTime === initialData.startTime &&
			upworkData.endTime === initialData.endTime
		) {
			upworkData.startTime = null;
			upworkData.endTime = null;
		}
		return { upworkData };
	}
}

export function _getInitialData(uid: string) {
	const upworkData: UpworkData = {
		date: null,
		endDate: currentDate,
		uid: uid ,
		startTime: currentTime,
		endTime: currentTime,
		timestamp: new Date(),
		type: [],
		hourlyCharge: null,
		fixedCharge: null,
		jobDuration: { hours: null, minutes: null }, // Updated to use Duration type
		clientLocation: '',
		hoursPerWeek: { hours: null, minutes: null }, // Updated to use Duration type
		clientHistory: '',
		platformCut: 20,
		platformCutType: 'percent',
		experience: [],
		unitsWorked: null,
		notes: '',
		workUnits: 'Hours'
	};

	const roverData: RoverData = {
		date: null ,
		endDate: currentDate,
		uid: uid,
		timestamp: new Date(),
		income: null,
		rate: null,
		tips: null,
		startTime: currentTime,
		endTime: currentTime,
		platformCut: 20,
		platformCutType: 'percent',
		cutIncome: null,
		unitsWorked: null,
		travelMiles: null,
		travelMinutes: null,
		workUnits: 'Hours',
		type: [],
		notes: ''
	};
	return { upworkData, roverData };
}
