<script>
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';

	export let data;
	let plugins = [TimeGrid];
	let options = {
		view: 'timeGridWeek',
		events: data.events,
		allDaySlot: false,
		slotDuration: '01:00:00', // This would typically set the slot to 1-hour increments
		scrollTime: '07:00:00', // Start the view at 7 AM
		slotLabelInterval: '01:00:00' // Labeling slots in 1-hour increments
	};
</script>

<Calendar {plugins} {options} />
