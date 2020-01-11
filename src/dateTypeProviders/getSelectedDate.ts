import { SelectedDate } from 'types/SelectedDate';
import { CalendarDate } from 'types/CalendarDate';

export const getSelectedDate = (calendarDate: CalendarDate): SelectedDate => ({
	...calendarDate,
	type: 'selected',
});
