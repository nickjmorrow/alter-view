import { EmptyDate } from 'types/EmptyDate';

export const isEmptyDate = (calendarDate: CalendarDate): calendarDate is EmptyDate =>
	(calendarDate as EmptyDate).type === 'empty';
