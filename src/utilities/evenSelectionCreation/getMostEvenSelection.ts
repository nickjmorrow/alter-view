import { getSelectionPossibilities } from 'utilities/evenSelectionCreation/getSelectionPossibilities';
import { getSpread } from 'utilities/evenSelectionCreation/getSpread';

export const getMostEvenSelection = (input: boolean[], numAdditionalEntries: number): boolean[] => {
	const possibilities = getSelectionPossibilities(input, numAdditionalEntries);

	const selectionSpreads = possibilities.map(s => ({
		selection: s,
		spread: getSpread(s),
	}));

	const maximumSpread = Math.max(...selectionSpreads.map(s => s.spread));
	return selectionSpreads.find(s => s.spread === maximumSpread)!.selection;
};
