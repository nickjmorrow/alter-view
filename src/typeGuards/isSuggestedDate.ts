import { CalendarDate } from 'types/CalendarDate';
import { SuggestedDate } from 'types/SuggestedDate';

export const isSuggestedDate = (calendarDate: CalendarDate): calendarDate is SuggestedDate =>
	(calendarDate as SuggestedDate).type === 'suggested';
