import { EmptyDate } from 'types/EmptyDate';

export interface HolidayDate extends EmptyDate {
	type: 'holiday';
	name: string;
}
