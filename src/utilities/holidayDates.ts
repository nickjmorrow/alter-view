import { HolidayDate } from 'types/HolidayDate';

export const holidayDates: HolidayDate[] = [
	{
		date: new Date(2019, 11, 25),
		name: 'Christmas',
	},
	{
		date: new Date(2019, 10, 28),
		name: 'Thanksgiving',
	},
].map(d => ({ ...d, type: 'holiday' }));
