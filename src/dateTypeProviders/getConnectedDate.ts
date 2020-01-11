import { CalendarDate } from 'types/CalendarDate';
import { ConnectedDate } from 'types/ConnectedDate';

export const getConnectedDate = (calendarDate: CalendarDate): ConnectedDate => ({
	...calendarDate,
	type: 'connected',
});
