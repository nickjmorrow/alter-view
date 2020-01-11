import { addEntriesToSelection } from 'utilities/assignVacationToSegment';
import { centerVacation } from 'utilities/centerVacation';

export const getNumVacation = (segment: boolean[]) => {
	return segment.reduce((agg, cur) => {
		if (cur) {
			agg += 1;
		}
		return agg;
	}, 0);
};

const getLastAssignment = (segment: boolean[]): number => {
	for (let i = segment.length; i >= 0; i--) {
		if (segment[i]) {
			return i;
		}
	}
	return -1; // this may not be right
};

export const getSelectionPossibilities = (segment: boolean[], numAdditionalEntries: number): boolean[][] => {
	const possibilities: boolean[][] = [];
	const numVacationOriginal = getNumVacation(segment);

	const getAssigned = (segment: boolean[]) => getNumVacation(segment) - numVacationOriginal;

	const helper = (segment: boolean[]): void => {
		const alreadyAssigned = getAssigned(segment);
		if (alreadyAssigned === numAdditionalEntries) {
			possibilities.push(centerVacation(segment));
			return;
		}
		const leftToAssign = numAdditionalEntries - alreadyAssigned;
		for (let i = 1; i <= leftToAssign; i++) {
			const lastAssignment = getLastAssignment(segment);
			const segmentToAssign = segment.slice(lastAssignment + 1, segment.length);

			// short-circuit, cannot assign enough
			if (i > segmentToAssign.length) {
				continue;
			}

			const assignedSegment = addEntriesToSelection(segmentToAssign as false[], i);
			const newSegment = [
				...segment.slice(0, lastAssignment === -1 ? 0 : lastAssignment + 1),
				...assignedSegment,
				...segment.slice(
					(lastAssignment === -1 ? 0 : lastAssignment) + assignedSegment.length + 1,
					segment.length,
				),
			];
			helper(newSegment);
		}
	};

	helper(segment);

	return possibilities;
};
