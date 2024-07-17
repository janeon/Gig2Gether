import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { signOut } from 'firebase/auth';
import { auth, db } from '$lib/firebase/client';
import { doc, getDoc } from 'firebase/firestore';

import type { User } from '../app';
import type { RequestEvent } from '@sveltejs/kit';



export const authenticateUser = async(event: RequestEvent) => {
	const {cookies} = event
	let verifytoken : string

	const userToken = cookies.get("session")
	if (!auth.currentUser) {
		return null
	}
	const currUser = auth.currentUser!.uid
	const ref = doc(db, "users", currUser)
	const docRef = await getDoc(ref)
	if (docRef.exists()) {
		verifytoken = docRef.data().authToken
		console.log("token",verifytoken)
		if (verifytoken != userToken) {
			cookies.delete('session', {path: '/'})
			signOut(auth)
			console.log("tokens not equal")
		}
		const user : User = {
			uid: currUser,
			role: docRef.data().role,
			email: docRef.data().email,
			platform: docRef.data().platform
		}
		return user
	}
	return null
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

export const getUser = async(currUser:string) => {
    const ref = doc(db, "users", currUser)
    const docRef = await getDoc(ref)
    if (docRef.exists()) {
        const user : User = {
            uid: currUser,
            role: docRef.data().role,
            email: docRef.data().email,
            platform: docRef.data().platform
        }
        return user
    }
    return null
}