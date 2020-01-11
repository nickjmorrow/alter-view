import { WrappedDate } from 'types/WrappedDate';
import { SuggestedDate } from 'types/SuggestedDate';

export const getSuggestedDate = (calendarDate: WrappedDate): SuggestedDate => ({
	...calendarDate,
	type: 'suggested',
});
