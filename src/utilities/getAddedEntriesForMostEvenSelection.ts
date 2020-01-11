import { getMostEvenSelection } from 'utilities/evenSelectionCreation/getMostEvenSelection';

export const getAddedEntriesForMostEvenSelection = (input: boolean[], numAdditionalEntries: number): boolean[] => {
	const mostEvenSelection = getMostEvenSelection(input, numAdditionalEntries);
	return input.map((value, index) => value !== mostEvenSelection[index]);
};
