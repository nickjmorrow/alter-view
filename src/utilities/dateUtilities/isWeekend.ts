import { WrappedDate } from 'types/WrappedDate';

export const isWeekend = (calendarDate: WrappedDate) =>
	calendarDate.date.getDay() === 0 || calendarDate.date.getDay() === 6;
