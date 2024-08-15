import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { db } from '$lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '../app';
import { sendEmailVerification } from "firebase/auth";

export function getHoursDifference(time1, time2) {
	if (!time1 || !time2) return 0;
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);
    return (h2 * 60 + m2 - h1 * 60 - m1) / 60;
}

export const extractAfterEquals = (value) => value?.includes('=') ? value.split('=')[1].trim() : value ?? null;
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