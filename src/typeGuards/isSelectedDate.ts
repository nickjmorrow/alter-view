import { SelectedDate } from 'types/SelectedDate';
import { CalendarDate } from 'types/CalendarDate';

export const isSelectedDate = (calendarDate: CalendarDate): calendarDate is SelectedDate =>
	(calendarDate as SelectedDate).type === 'selected';
