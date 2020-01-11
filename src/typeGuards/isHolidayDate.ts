import { CalendarDate } from 'types/CalendarDate';
import { HolidayDate } from 'types/HolidayDate';

export const isHolidayDate = (calendarDate: CalendarDate): calendarDate is HolidayDate =>
	(calendarDate as HolidayDate).type === 'holiday';
