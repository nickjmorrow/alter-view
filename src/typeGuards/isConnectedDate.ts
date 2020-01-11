import { ConnectedDate } from 'types/ConnectedDate';
import { CalendarDate } from 'types/CalendarDate';

export const isConnectedDate = (calendarDate: CalendarDate): calendarDate is ConnectedDate =>
	(calendarDate as ConnectedDate).type === 'connected';
