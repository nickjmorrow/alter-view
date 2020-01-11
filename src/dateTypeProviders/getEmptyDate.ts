import { CalendarDate } from 'types/CalendarDate';
import { EmptyDate } from 'types/EmptyDate';

export const getEmptyDate = (calendarDate: CalendarDate): EmptyDate => ({
	...calendarDate,
	type: 'empty',
});
