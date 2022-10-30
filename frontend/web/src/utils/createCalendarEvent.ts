import { CalendarOptions, ICalendar } from 'datebook'

export function createCalendarEvent(config: CalendarOptions): ICalendar {
	console.log(config)
	const icalendar = new ICalendar(config)
	return icalendar
}
