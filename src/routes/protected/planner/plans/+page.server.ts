import { db } from '$lib/firebase/client';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export async function load({ parent }) {
	const user = (await parent()).user;
    let events = [];
	// get planner entries
	let snapshot = await getDocs(query(collection(db, 'planner', user.platform, user.uid)));

	snapshot.forEach((doc) => {
        Object.values(doc.data()).forEach((timestamp, index) => {
            const start = new Date(timestamp.seconds * 1000);
            const end = new Date(start.getTime() + 3600 * 1000);  // Assuming a default duration of 1 hour
            // Create an event object
            const event = {
              start: start.toISOString(),
              end: end.toISOString(),
              title: `Event ${index + 1}`,
              description: `Event ${index + 1} Description`,
            };
          
            // Append the event object to the list
            events.push(event);
          });
	});

    return {
		events: events
	};
}
