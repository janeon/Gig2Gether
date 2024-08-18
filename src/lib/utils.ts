import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { db } from '$lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '../app';
import { sendEmailVerification } from "firebase/auth";

export const extractAfterEquals = (value: string | null | undefined): string | null => {
    if (typeof value === 'number' ) {
        return value;
    }
    if (value == null) {
        return null; // Return null if input is not a string, or if it is null or undefined
    }
    return value.includes('=') ? value.split('=')[1].trim() : null;
};
const now = new Date();
const pad = (num) => num.toString().padStart(2, '0');
export const currentDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
export const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

export function convertToLocalDate(dateString: string): Date {
    // Parse the date string (assumed to be in "YYYY-MM-DD" format)
    const [year, month, day] = dateString.split('-').map(Number);
    // Create a Date object in the local timezone
    return new Date(year, month - 1, day);
}

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateData(data) {
    for (const key in data) {
        const value = data[key];
        
        if (value === null || value === undefined) {
            console.error(`Field ${key} is null or undefined.`);
            return false; // Field is null or undefined
        }
        
        if (typeof value === 'string' && value.trim() === '') {
            console.error(`Field ${key} is an empty string.`);
            return false; // Field is an empty string
        }
        
        if (Array.isArray(value) && value.length === 0) {
            console.error(`Field ${key} is an empty list.`);
            return false; // Field is an empty list
        }
    }
    return true; // All fields are valid
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

/** Auth fxns **/
export const getUser = async(uid:string) => {
    const ref = doc(db, "users", uid)
    const docRef = await getDoc(ref)
    if (docRef.exists()) {
        const user : User = {
            uid: uid,
            role: docRef.data().role,
			credentials: docRef.data().credentials,
            username: docRef.data().username,
            platform: docRef.data().platform
        }
        return user
    }
    // It's not always known whether a phone user is registered or not
    // we'll handle this case in the login by providing error when user not found
    return null
}

export const sendEmailVerificationWithContinueUrl = async (user, token) => {
	const actionCodeSettings = {
		url: `https://gigshare.web.app/verify-email?token=${token}`,
		handleCodeInApp: true,
	};
	await sendEmailVerification(user, actionCodeSettings);
};


/** Time-based calculations **/

export function calculateHourlyRates(
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

export function getHoursDifference(time1, time2) {
	if (!time1 || !time2) return 0;
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);
    return (h2 * 60 + m2 - h1 * 60 - m1) / 60;
}

export function calculateMissingTime(startTime: string | null, endTime: string | null, hoursBetween: number): string {
    const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const toTimeString = (mins: number) => `${Math.floor(mins / 60)}:${(mins % 60).toString().padStart(2, '0')}`;

    const totalMinutes = hoursBetween * 60;

    return startTime 
        ? toTimeString(toMinutes(startTime) + totalMinutes) 
        : toTimeString(toMinutes(endTime!) - totalMinutes);
}

export function transformHourlyData(data: { [key: string]: { totalEarnings: number; totalHours: number; averageRate: number } }): { x: string; y: number }[] {
	// Map the data to the desired format with truncated averageRate
	return Object.entries(data).map(([key, value]) => ({
	  x: key,
	  y: parseFloat(value.averageRate.toFixed(2)) // truncate averageRate to 2 decimals
	}));
  }


/* Handlers */
export async function handleFileChange(event: Event) {
	const fileInput = event.target as HTMLInputElement;
	if (fileInput.files && fileInput.files.length > 0) {
		return fileInput.files[0];
	}
	return null;
}

export function handleKeyDown(event: KeyboardEvent) {
    if (
        !/^\d$/.test(event.key) && // Allow digits 0-9
        event.key !== "Backspace" && // Allow backspace
        event.key !== "ArrowLeft" && // Allow arrow keys
        event.key !== "ArrowRight" && // Allow arrow keys
        event.key !== "Tab" // Allow tab
    ) {
        event.preventDefault();
    }
}

export function handleRatingsKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    
    if (event.key === "." && input.value.includes(".")) {
        event.preventDefault(); // Prevent additional periods
    } else if (!/^\d$/.test(event.key) && 
               event.key !== "Backspace" && 
               event.key !== "ArrowLeft" && 
               event.key !== "ArrowRight" && 
               event.key !== "Tab") {
        event.preventDefault(); // Prevent non-digit characters
    }
}

export function handleBrowseClick() {
	const fileInput = document.getElementById('selectedFile');
	if (fileInput) {
	  (fileInput as HTMLInputElement).click();
	}
  }


  