import { getAddedEntriesForMostEvenSelection } from 'utilities/getAddedEntriesForMostEvenSelection';
import { CalendarDate } from 'types/CalendarDate';
import { isVacationDate } from 'typeGuards/isVacationDate';
import { getSuggestedDate } from 'dateTypeProviders/getSuggestedDate';
import { getMostEvenSelection } from 'utilities/evenSelectionCreation/getMostEvenSelection';

export const getUpdatedSuggestedDates = (dates: CalendarDate[], numVacationDaysToAssign: number): CalendarDate[] => {
	const currentEntries = dates.map(isVacationDate);
	console.log(numVacationDaysToAssign);
	const updatedEntries = getMostEvenSelection(currentEntries, numVacationDaysToAssign);
	const isNewlyAdded = currentEntries.map((cd, i) => updatedEntries[i] && cd !== updatedEntries[i]);
	return dates.map((d, i) => {
		return isNewlyAdded[i] ? getSuggestedDate(d) : d;
	});
};
