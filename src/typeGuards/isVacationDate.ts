import { VacationDate } from 'types/VacationDate';
import { CalendarDate } from 'types/CalendarDate';
import { isSelectedDate } from 'typeGuards/isSelectedDate';
import { isHolidayDate } from 'typeGuards/isHolidayDate';
import { isConnectedDate } from 'typeGuards/isConnectedDate';
import { isSuggestedDate } from 'typeGuards/isSuggestedDate';

export const isVacationDate = (calendarDate: CalendarDate): calendarDate is VacationDate =>
	[isSelectedDate, isHolidayDate, isConnectedDate, isSuggestedDate].some(func => func(calendarDate));
