export interface Post {
    title: string,
    description: string,
    url: string,
    uid: string,
    date: Date,
    tags: string[],
    type: string,
    likes: string[],
    platform: string,
    id: string,
    username: string,
}

export interface Data {
    type: string,
    date: Date,
    title: string,
    id: string
}

export interface RoverData {
	date: string | null;
	endDate: string | null;
	uid: string | null;
	timestamp: Date | null;
	income: number | null;
	rate: number | null;
	tips: number | null;
	startTime: string | null;
	endTime: string | null;
	platformCut: number | null;
	platformCutType: string | null;
	unitsWorked: number | null;
	cutIncome: number | null;
	travelMiles: number | null;
	travelMinutes: number | null;
	workUnits: string | null;
	notes: string | null;
	type: string[] | [];
}

export interface UpworkData {
    date: string | null;
    endDate: string | null;
    uid: string | null;
    timestamp: Date | null;
    startTime: string | null;
	endTime: string | null;
    type: string[] | [];
    hourlyCharge: number | null;
    fixedCharge: number | null;
    jobDuration: { hours: number | null, minutes: number | null } | null;
    clientLocation: string | null;
    hoursPerWeek: { hours: number | null, minutes: number | null } | null;
    clientHistory: string | null;
    platformCut: number | null;
	platformCutType: string | null;
    experience: string[] | [];
    notes: string | null;
    unitsWorked: number | null;
    workUnits: string | null;
}