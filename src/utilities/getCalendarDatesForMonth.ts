import { Calendar as CalendarUtil } from 'calendar-base';
import { EmptyDate } from 'types/EmptyDate';

// TODO: Move logic for buffering month.
export const getCalendarDatesForMonth = (year: number, month: number): EmptyDate[] => {
	const calendarUtil = new CalendarUtil();
	const previousMonthDates = (month === 0
		? calendarUtil.getCalendar(year - 1, 11)
		: calendarUtil.getCalendar(year, month - 1)
	).filter(d => d !== false);

	const nextMonthDates = (month === 11
		? calendarUtil.getCalendar(year + 1, 0)
		: calendarUtil.getCalendar(year, month + 1)
	).filter(d => d !== false);

	const days = calendarUtil.getCalendar(year, month);

	const numPrecedingBufferDates = () => {
		let counter = 0;
		for (let i = 0; i < days.length; i++) {
			if (days[i] === false) {
				counter += 1;
			} else {
				break;
			}
		}

		return counter;
	};

	const numFollowingBufferDates = () => {
		let counter = 0;
		for (let i = days.length - 1; i >= 0; i--) {
			if (days[i] === false) {
				counter += 1;
			} else {
				break;
			}
		}
		return counter;
	};

	const toCalendarDate = (intermediateShape: IntermediateShape): EmptyDate => {
		const newDate = new Date();
		newDate.setDate(intermediateShape.day);
		newDate.setMonth(intermediateShape.month);
		newDate.setFullYear(intermediateShape.year);
		return { ...intermediateShape, date: newDate, type: 'empty' };
	};

	return days.filter(isIntermediateShape).map(toCalendarDate);
};

function isIntermediateShape(input: false | IntermediateShape): input is IntermediateShape {
	return input !== false;
}

export interface IntermediateShape {
	day: number;
	weekDay: number;
	month: number;
	year: number;
}
