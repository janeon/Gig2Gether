import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { db } from '$lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '../app';
import { sendEmailVerification } from 'firebase/auth';

export const extractAfterEquals = (value: string | null | undefined | number): number | null => {
	if (value === null) {
		return null; // Return null if input is null or undefined
	} else if (typeof value === 'number') {
		return value;
	} else if (typeof value !== 'string') {
		return null;
	}

	// console.log("Made it through");

	let result;
	if (!isNaN(Number(value))) {
		result = Number(value);
	} else {
		result = value.includes('=') ? value.split('=')[1].trim() : null;
		result = result !== null && !isNaN(Number(result)) ? Number(result) : null;
	}

	return result;
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
		// console.log("string?", key, typeof value === 'string');
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
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
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
export const getUser = async (uid: string) => {
	const ref = doc(db, 'users', uid);
	const docRef = await getDoc(ref);
	if (docRef.exists()) {
		const user: User = {
			uid: uid,
			role: docRef.data().role,
			credentials: docRef.data().credentials,
			username: docRef.data().username,
			platform: docRef.data().platform
		};
		return user;
	}
	// It's not always known whether a phone user is registered or not
	// we'll handle this case in the login by providing error when user not found
	return null;
};

export const sendEmailVerificationWithContinueUrl = async (user, token) => {
	const actionCodeSettings = {
		url: `https://gigshare.web.app/verify-email?token=${token}`,
		handleCodeInApp: true
	};
	await sendEmailVerification(user, actionCodeSettings);
};

/* Handlers */

export function handleKeyDown(event: KeyboardEvent) {
	if (
		!/^\d$/.test(event.key) && // Allow digits 0-9
		event.key !== 'Backspace' && // Allow backspace
		event.key !== 'ArrowLeft' && // Allow arrow keys
		event.key !== 'ArrowRight' && // Allow arrow keys
		event.key !== 'Tab' // Allow tab
	) {
		event.preventDefault();
	}
}

export function handleRatingsKeyDown(event: KeyboardEvent) {
	const input = event.target as HTMLInputElement;

	if (event.key === '.' && input.value.includes('.')) {
		event.preventDefault(); // Prevent additional periods
	} else if (
		!/^\d$/.test(event.key) &&
		event.key !== '.' &&
		event.key !== 'Backspace' &&
		event.key !== 'ArrowLeft' &&
		event.key !== 'ArrowRight' &&
		event.key !== 'Tab'
	) {
		event.preventDefault(); // Prevent non-digit characters except period
	}
}

export function handleBrowseClick() {
	const fileInput = document.getElementById('selectedFile');
	if (fileInput) {
		(fileInput as HTMLInputElement).click();
	}
}
